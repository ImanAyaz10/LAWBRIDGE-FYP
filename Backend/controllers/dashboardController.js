const Case = require('../models/Case');
const Appointment = require('../models/Appointment');

// @desc    Get user/lawyer dashboard data with computed reminders and notifications
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
    try {
        let data = {};
        const todayStr = new Date().toISOString().split('T')[0];

        if (req.user.role === 'lawyer') {
            // Lawyer Dashboard
            const appointments = await Appointment.find({ lawyerId: req.user._id })
                .populate('userId', 'name email')
                .sort({ date: 1, time: 1 });

            const reminders = [];
            const notifications = [];

            appointments.forEach(app => {
                const isToday = app.date === todayStr;
                const isConfirmed = app.status === 'Confirmed' || app.status === 'Accepted';

                // 1. Reminders for Confirmed appointments happening today
                if (isConfirmed && isToday) {
                    reminders.push({
                        id: app._id,
                        title: "Upcoming Consultation Today",
                        message: `You have a ${app.consultationType} call with ${app.userId?.name} today at ${app.time} for "${app.subject}".`,
                        time: app.time,
                        type: 'reminder',
                        consultationType: app.consultationType
                    });
                }

                // 2. Notifications for Pending Requests
                if (app.status === 'Pending') {
                    notifications.push({
                        id: app._id,
                        title: "New Appointment Request",
                        message: `${app.userId?.name} requested a ${app.consultationType} consultation on ${app.date} at ${app.time} for "${app.subject}".`,
                        createdAt: app.createdAt,
                        type: 'pending'
                    });
                }
            });

            data = {
                appointments,
                reminders,
                notifications,
                stats: {
                    pending: appointments.filter(a => a.status === 'Pending').length,
                    accepted: appointments.filter(a => a.status === 'Confirmed' || a.status === 'Accepted').length,
                    total: appointments.length
                }
            };
        } else {
            // User/Client Dashboard
            const cases = await Case.find({ userId: req.user._id }).sort({ createdAt: -1 });
            const appointments = await Appointment.find({ userId: req.user._id })
                .populate('lawyerId', 'name specialization email')
                .sort({ date: 1, time: 1 });

            const reminders = [];
            const notifications = [];

            appointments.forEach(app => {
                const isToday = app.date === todayStr;
                const isConfirmed = app.status === 'Confirmed' || app.status === 'Accepted';

                // 1. Reminders for Confirmed appointments happening today
                if (isConfirmed && isToday) {
                    reminders.push({
                        id: app._id,
                        title: "Upcoming Consultation Today",
                        message: `You have a ${app.consultationType} call with ${app.lawyerId?.name} today at ${app.time} for "${app.subject}".`,
                        time: app.time,
                        type: 'reminder',
                        consultationType: app.consultationType
                    });
                }

                // 2. Notifications for Status changes
                if (app.status === 'Confirmed' || app.status === 'Accepted') {
                    notifications.push({
                        id: app._id,
                        title: "Appointment Confirmed",
                        message: `${app.lawyerId?.name} accepted your consultation request on ${app.date} at ${app.time}.`,
                        createdAt: app.createdAt,
                        type: 'confirmed'
                    });
                } else if (app.status === 'Rejected') {
                    notifications.push({
                        id: app._id,
                        title: "Appointment Rejected",
                        message: `${app.lawyerId?.name} declined your consultation request for ${app.date}. ${app.rejectionReason ? 'Reason: ' + app.rejectionReason : ''}`,
                        createdAt: app.createdAt,
                        type: 'rejected'
                    });
                } else if (app.status === 'Pending') {
                    notifications.push({
                        id: app._id,
                        title: "Appointment Pending",
                        message: `Your appointment request with ${app.lawyerId?.name} is currently awaiting review.`,
                        createdAt: app.createdAt,
                        type: 'pending'
                    });
                }
            });

            data = {
                cases,
                appointments,
                reminders,
                notifications,
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
