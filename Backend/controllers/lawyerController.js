const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to check if request is authenticated
const getAuthenticatedUser = async (req) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return await User.findById(decoded.id);
        } catch (error) {
            return null;
        }
    }
    return null;
};

// @desc    Get lawyers with filters
// @route   GET /api/lawyers
// @access  Public (sensitive details masked for visitors)
const getLawyers = async (req, res) => {
    const { type, city, search } = req.query;
    
    let query = { role: { $in: ['lawyer'] } }; 

    if (type) {
        query.specialization = { $regex: type, $options: 'i' };
    }

    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    if (city) {
        query.city = { $regex: city, $options: 'i' };
    }

    const lawyers = await User.find(query).select('-password');
    const currentUser = await getAuthenticatedUser(req);

    if (!currentUser) {
        // Mask/Strip sensitive fields (email, phone, address, licenseNumber) for visitors
        const publicLawyers = lawyers.map(lawyer => ({
            _id: lawyer._id,
            name: lawyer.name,
            role: lawyer.role,
            specialization: lawyer.specialization,
            city: lawyer.city,
            experience: lawyer.experience,
            bio: lawyer.bio,
            profileImage: lawyer.profileImage,
        }));
        return res.json(publicLawyers);
    }

    res.json(lawyers);
};

// @desc    Get lawyer by ID
// @route   GET /api/lawyers/:id
// @access  Public (sensitive details masked for visitors)
const getLawyerById = async (req, res) => {
    const lawyer = await User.findById(req.params.id).select('-password');
    if (lawyer && lawyer.role === 'lawyer') {
        const currentUser = await getAuthenticatedUser(req);
        if (!currentUser) {
            // Mask/Strip sensitive fields for visitors
            return res.json({
                _id: lawyer._id,
                name: lawyer.name,
                role: lawyer.role,
                specialization: lawyer.specialization,
                city: lawyer.city,
                experience: lawyer.experience,
                bio: lawyer.bio,
                profileImage: lawyer.profileImage,
            });
        }
        res.json(lawyer);
    } else {
        res.status(404);
        throw new Error('Lawyer not found');
    }
};

module.exports = { getLawyers, getLawyerById };


