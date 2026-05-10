const Appointment = require('../models/Appointment');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
    const { lawyerId, date, time } = req.body;

    if (!lawyerId || !date || !time) {
        res.status(400);
        throw new Error('Please provide lawyerId, date, and time');
    }

    const appointment = await Appointment.create({
        userId: req.user._id,
        lawyerId,
        date,
        time,
    });

    res.status(201).json(appointment);
};

// @desc    Get user appointments
// @route   GET /api/appointments/my
// @access  Private
const getMyAppointments = async (req, res) => {
    const query = req.user.role === 'lawyer' ? { lawyerId: req.user._id } : { userId: req.user._id };
    
    const appointments = await Appointment.find(query)
        .populate('userId', 'name email')
        .populate('lawyerId', 'name email specialization city');
        
    res.json(appointments);
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (Lawyer only for accept/reject)
const updateAppointmentStatus = async (req, res) => {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
        res.status(404);
        throw new Error('Appointment not found');
    }

    // Only the assigned lawyer can update status
    if (appointment.lawyerId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this appointment');
    }

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    updateAppointmentStatus,
};
