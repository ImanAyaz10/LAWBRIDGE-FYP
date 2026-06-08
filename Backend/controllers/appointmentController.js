const Appointment = require('../models/Appointment');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
    const { lawyerId, date, time, consultationType, subject, notes } = req.body;

    if (!lawyerId || !date || !time) {
        return res.status(400).json({ message: 'Please provide lawyerId, date, and time' });
    }

    try {
        const appointment = await Appointment.create({
            userId: req.user._id,
            lawyerId,
            date,
            time,
            consultationType: consultationType || 'Video',
            subject: subject || 'General Legal Consultation',
            notes: notes || '',
            status: 'Pending'
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user appointments
// @route   GET /api/appointments/my
// @access  Private
const getMyAppointments = async (req, res) => {
    try {
        const query = req.user.role === 'lawyer' ? { lawyerId: req.user._id } : { userId: req.user._id };
        
        const appointments = await Appointment.find(query)
            .populate('userId', 'name email')
            .populate('lawyerId', 'name email specialization city')
            .sort({ date: -1, time: -1 });
            
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get appointment by ID (secure room check)
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('lawyerId', 'name email specialization city');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Security Check: Only the assigned client or lawyer can access
        const isClient = appointment.userId._id.toString() === req.user._id.toString();
        const isLawyer = appointment.lawyerId._id.toString() === req.user._id.toString();

        if (!isClient && !isLawyer) {
            return res.status(403).json({ message: 'Access Denied: You are not authorized to view this appointment.' });
        }

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status (accept/reject/complete)
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointmentStatus = async (req, res) => {
    const { status, rejectionReason } = req.body;

    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const isClient = appointment.userId.toString() === req.user._id.toString();
        const isLawyer = appointment.lawyerId.toString() === req.user._id.toString();

        // Security check: Only lawyer can accept/reject; both can mark as completed
        if (status === 'Confirmed' || status === 'Accepted' || status === 'Rejected') {
            if (!isLawyer) {
                return res.status(401).json({ message: 'Not authorized to accept or reject this appointment' });
            }
        } else if (status === 'Completed') {
            if (!isLawyer && !isClient) {
                return res.status(401).json({ message: 'Not authorized to complete this appointment' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid status update requested' });
        }

        appointment.status = status === 'Accepted' ? 'Confirmed' : status;

        if (status === 'Rejected' && rejectionReason) {
            appointment.rejectionReason = rejectionReason;
        }

        // Set deterministic secure Jitsi link on confirmation
        if (appointment.status === 'Confirmed' && appointment.consultationType === 'Video') {
            appointment.meetingLink = `https://meet.jit.si/lawbridge-${appointment._id}`;
        }

        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    getAppointmentById,
    updateAppointmentStatus,
};
