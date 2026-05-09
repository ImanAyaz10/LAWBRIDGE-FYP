const Case = require('../models/Case');
const Appointment = require('../models/Appointment');

// @desc    Get user/lawyer dashboard data
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
    try {
        let data = {};

        if (req.user.role === 'lawyer') {
            // Lawyer Dashboard
            const appointments = await Appointment.find({ lawyerId: req.user._id })
                .populate('userId', 'name email')
                .sort({ createdAt: -1 });

            data = {
                appointments,
                stats: {
                    pending: appointments.filter(a => a.status === 'Pending').length,
                    accepted: appointments.filter(a => a.status === 'Accepted').length,
                    total: appointments.length
                }
            };
        } else {
            // User Dashboard
            const cases = await Case.find({ userId: req.user._id }).sort({ createdAt: -1 });
            const appointments = await Appointment.find({ userId: req.user._id })
                .populate('lawyerId', 'name specialization')
                .sort({ createdAt: -1 });

            data = {
                cases,
                appointments,
                stats: {
                    totalCases: cases.length,
                    totalAppointments: appointments.length
                }
            };
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardData };
