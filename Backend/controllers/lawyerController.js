const User = require('../models/User');

// @desc    Get lawyers with filters
// @route   GET /api/lawyers
// @access  Private
const getLawyers = async (req, res) => {
    const { type, city } = req.query;
    
    let query = { role: 'lawyer' };

    if (type) {
        query.specialization = { $regex: type, $options: 'i' };
    }

    if (city) {
        query.city = { $regex: city, $options: 'i' };
    }

    try {
        const lawyers = await User.find(query).select('-password');
        res.json(lawyers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get lawyer by ID
// @route   GET /api/lawyers/:id
// @access  Private
const getLawyerById = async (req, res) => {
    try {
        const lawyer = await User.findById(req.params.id).select('-password');
        if (lawyer && lawyer.role === 'lawyer') {
            res.json(lawyer);
        } else {
            res.status(404).json({ message: 'Lawyer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getLawyers, getLawyerById };

