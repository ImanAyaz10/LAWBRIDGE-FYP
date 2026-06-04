const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'number', 'date'],
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: true,
  },
}, { _id: false });

const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  fields: [fieldSchema],
  contentTemplate: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Template', templateSchema);
