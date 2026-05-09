const Appointment = require('../models/Appointment');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
    const { lawyerId, date, time } = req.body;

    if (!lawyerId || !date || !time) {
        return res.status(400).json({ message: 'Please provide lawyerId, date, and time' });
    }

    try {
        const appointment = await Appointment.create({
            userId: req.user._id,
            lawyerId,
            date,
            time,
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
            .populate('lawyerId', 'name email specialization city');
            
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Lawyer only for accept/reject)
const updateAppointmentStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Only the assigned lawyer can update status (except for cancellation by user, but let's keep it simple for now)
        if (appointment.lawyerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this appointment' });
        }

        appointment.status = status;
        await appointment.save();

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    updateAppointmentStatus,
};
