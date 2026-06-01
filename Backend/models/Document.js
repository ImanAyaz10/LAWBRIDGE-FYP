const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    default: '',
  },
  filePath: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
