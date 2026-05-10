const User = require('../models/User');

// @desc    Get lawyers with filters
// @route   GET /api/lawyers
// @access  Private
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
    res.json(lawyers);
};

// @desc    Get lawyer by ID
// @route   GET /api/lawyers/:id
// @access  Private
const getLawyerById = async (req, res) => {
    const lawyer = await User.findById(req.params.id).select('-password');
    if (lawyer && lawyer.role === 'lawyer') {
        res.json(lawyer);
    } else {
        res.status(404);
        throw new Error('Lawyer not found');
    }
};

module.exports = { getLawyers, getLawyerById };

