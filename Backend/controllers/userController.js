const User = require('../models/User');
const Admin = require('../models/Admin');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user._id).select('-password');
        if (!user) {
            user = await Admin.findById(req.user._id).select('-password');
        }
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        let isAdmin = false;
        if (!user) {
            user = await Admin.findById(req.user._id);
            isAdmin = true;
        }

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            // Optional specialized fields for lawyers
            if (!isAdmin) {
                if (req.body.specialization !== undefined) {
                    user.specialization = req.body.specialization;
                }
                if (req.body.city !== undefined) {
                    user.city = req.body.city;
                }
                if (req.body.phone !== undefined) {
                    user.phone = req.body.phone;
                }
                if (req.body.address !== undefined) {
                    user.address = req.body.address;
                }
                if (req.body.experience !== undefined) {
                    user.experience = req.body.experience;
                }
                if (req.body.licenseNumber !== undefined) {
                    user.licenseNumber = req.body.licenseNumber;
                }
                if (req.body.bio !== undefined) {
                    user.bio = req.body.bio;
                }
            }

            // Handle password update if provided
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                specialization: updatedUser.specialization,
                city: updatedUser.city,
                phone: updatedUser.phone,
                address: updatedUser.address,
                experience: updatedUser.experience,
                licenseNumber: updatedUser.licenseNumber,
                bio: updatedUser.bio,
                profileImage: updatedUser.profileImage,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload user profile image
// @route   POST /api/users/upload-image
// @access  Private
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image file' });
        }

        let user = await User.findById(req.user._id);
        if (!user) {
            user = await Admin.findById(req.user._id);
        }

        if (user) {
            // Convert buffer to base64 Data URL
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

            user.profileImage = base64Image;
            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                specialization: updatedUser.specialization,
                city: updatedUser.city,
                phone: updatedUser.phone,
                address: updatedUser.address,
                experience: updatedUser.experience,
                licenseNumber: updatedUser.licenseNumber,
                bio: updatedUser.bio,
                profileImage: updatedUser.profileImage,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    uploadProfileImage,
};
