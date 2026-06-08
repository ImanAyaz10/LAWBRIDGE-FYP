const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lawyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    meetingLink: {
        type: String,
        default: 'https://meet.jit.si/lawbridge-' + Math.random().toString(36).substring(7),
    },
    consultationType: {
        type: String,
        enum: ['Video', 'Audio', 'In-Person'],
        default: 'Video',
    },
    subject: {
        type: String,
    },
    notes: {
        type: String,
    },
    rejectionReason: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Confirmed', 'Rejected', 'Completed'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
