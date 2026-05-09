const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a case description'],
    },
    caseType: {
        type: String,
        default: 'General',
    },
    complexity: {
        type: String,
        enum: ['Easy', 'Medium', 'Complex'],
        default: 'Medium',
    },
    estimatedTime: {
        type: String,
        default: '2-4 weeks',
    },
    suggestion: {
        type: String,
    },
    score: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    jurisdiction: {
        city: String,
        court: String,
    },
    roadmap: [{
        step: Number,
        title: String,
        description: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Case', caseSchema);
