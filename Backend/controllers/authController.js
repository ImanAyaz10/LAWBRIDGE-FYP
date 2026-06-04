const User = require('../models/User');
const OTP = require('../models/OTP');
const { sendOTPEmail } = require('../services/emailService');
const generateToken = require('../utils/generateToken');

// @desc    Initiate registration (Send OTP)
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, specialization, city, phone, address, experience, licenseNumber, bio } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        if (role === 'lawyer') {
            if (!phone || !address || !experience || !licenseNumber) {
                return res.status(400).json({ message: 'Please provide all lawyer required fields' });
            }
        }

        // Validate duplicate user by email
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email address' });
        }

        // Validate duplicate user by licenseNumber for lawyers
        if (role === 'lawyer' && licenseNumber) {
            const licenseExists = await User.findOne({ licenseNumber });
            if (licenseExists) {
                return res.status(400).json({ message: 'A lawyer with this License ID is already registered' });
            }
            const pendingLicense = await OTP.findOne({ licenseNumber });
            if (pendingLicense) {
                return res.status(400).json({ message: 'A registration is already pending for this License ID' });
            }
        }

        let profileImage = '';
        if (req.file) {
            profileImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Upsert OTP details (delete any existing pending OTP first)
        await OTP.deleteOne({ email });
        
        await OTP.create({
            name,
            email,
            password,
            role: role || 'client',
            specialization,
            city,
            phone,
            address,
            experience,
            licenseNumber,
            bio,
            profileImage,
            otp,
            expiresAt,
            attempts: 0,
        });

        // Send Email
        await sendOTPEmail(email, otp);

        res.status(200).json({
            success: true,
            message: 'A secure 6-digit verification code has been sent to your email.',
            email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify OTP & Complete account registration
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Please provide email and verification code' });
        }

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({ message: 'No pending registration found or verification expired' });
        }

        // Check if expired
        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ email });
            return res.status(400).json({ message: 'Verification code expired. Please sign up again.' });
        }

        // Check attempts limit (max 5)
        if (otpRecord.attempts >= 5) {
            await OTP.deleteOne({ email });
            return res.status(400).json({ message: 'Too many incorrect attempts. Registration cancelled, please sign up again.' });
        }

        // Match OTP
        if (otpRecord.otp !== otp) {
            otpRecord.attempts += 1;
            await otpRecord.save();
            
            const remaining = 5 - otpRecord.attempts;
            return res.status(400).json({ 
                message: `Invalid verification code. You have ${remaining} attempts remaining.` 
            });
        }

        // Create the actual user
        const user = await User.create({
            name: otpRecord.name,
            email: otpRecord.email,
            password: otpRecord.password,
            role: otpRecord.role,
            specialization: otpRecord.specialization,
            city: otpRecord.city,
            phone: otpRecord.phone,
            address: otpRecord.address,
            experience: otpRecord.experience,
            licenseNumber: otpRecord.licenseNumber,
            bio: otpRecord.bio,
            profileImage: otpRecord.profileImage,
        });

        // Delete the temporary OTP record
        await OTP.deleteOne({ email });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            specialization: user.specialization,
            city: user.city,
            phone: user.phone,
            address: user.address,
            experience: user.experience,
            licenseNumber: user.licenseNumber,
            bio: user.bio,
            profileImage: user.profileImage,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Resend registration OTP
// @route   POST /api/auth/resend-otp
// @access  Public
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Please provide email address' });
        }

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({ message: 'No pending registration found for this email.' });
        }

        // Rate limit: 60 seconds
        const timeDiff = Date.now() - new Date(otpRecord.updatedAt).getTime();
        if (timeDiff < 60000) {
            const secondsLeft = Math.ceil((60000 - timeDiff) / 1000);
            return res.status(400).json({ 
                message: `Please wait ${secondsLeft} seconds before requesting a new code.` 
            });
        }

        // Generate and update OTP
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        otpRecord.otp = newOtp;
        otpRecord.expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Reset expiry to 5m
        otpRecord.attempts = 0; // Reset attempts

        await otpRecord.save();

        // Send Email
        await sendOTPEmail(email, newOtp);

        res.status(200).json({
            success: true,
            message: 'A new verification code has been successfully sent to your email.',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                specialization: user.specialization,
                city: user.city,
                phone: user.phone,
                address: user.address,
                experience: user.experience,
                licenseNumber: user.licenseNumber,
                bio: user.bio,
                profileImage: user.profileImage,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    verifyOTP,
    resendOTP,
    loginUser,
};
