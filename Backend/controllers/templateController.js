const Template = require('../models/Template');
const asyncHandler = require('express-async-handler');

// @desc    Get all legal templates
// @route   GET /api/templates
// @access  Protected (Clients & Lawyers)
const getTemplates = asyncHandler(async (req, res) => {
  const templates = await Template.find({}).select('-contentTemplate'); // Don't return full template body in list
  res.json(templates);
});

// @desc    Get a legal template by code
// @route   GET /api/templates/:code
// @access  Protected (Clients & Lawyers)
const getTemplateByCode = asyncHandler(async (req, res) => {
  const template = await Template.findOne({ code: req.params.code });
  if (!template) {
    res.status(404);
    throw new Error('Template not found');
  }
  res.json(template);
});

module.exports = {
  getTemplates,
  getTemplateByCode,
};
