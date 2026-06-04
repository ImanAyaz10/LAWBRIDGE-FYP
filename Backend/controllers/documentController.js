const Document = require('../models/Document');
const asyncHandler = require('express-async-handler');

// @desc    Upload a legal document file
// @route   POST /api/documents/upload
// @access  Protected
const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  const document = await Document.create({
    ownerId: req.user._id,
    title: req.body.title || req.file.originalname,
    content: req.body.content || 'Uploaded PDF/Document File',
    filePath: `/uploads/${req.file.filename}`,
  });

  res.status(201).json(document);
});

// @desc    Get user's documents (both uploaded and generated)
// @route   GET /api/documents
// @access  Protected
const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ ownerId: req.user._id }).sort({ createdAt: -1 });
  res.json(documents);
});

// @desc    Save content of a generated template document
// @route   POST /api/documents/save-generated
// @access  Protected
const saveGeneratedDocument = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please provide title and content for the document');
  }

  const document = await Document.create({
    ownerId: req.user._id,
    title,
    content,
    filePath: null, // Indicates template-generated document
  });

  res.status(201).json(document);
});

module.exports = {
  uploadDocument,
  getDocuments,
  saveGeneratedDocument,
};
