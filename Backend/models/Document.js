const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Case',
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    type: String, // e.g., 'PDF', 'Image'
    size: Number,
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
