const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    specialization: [String],
    experience: Number,
    bio: String,
    licenseNumber: String,
    rating: {
        type: Number,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    consultationFee: Number,
    availability: [
        {
            day: String,
            startTime: String,
            endTime: String,
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Lawyer', lawyerSchema);
