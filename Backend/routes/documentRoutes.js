const express = require('express');
const router = express.Router();
const { 
  uploadDocument, 
  getDocuments, 
  saveGeneratedDocument 
} = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Upload a physical file (uses Multer middleware)
router.post('/upload', protect, upload.single('file'), uploadDocument);

// Save generated legal document text content
router.post('/save-generated', protect, saveGeneratedDocument);

// Get list of all documents for current user
router.get('/', protect, getDocuments);

module.exports = router;
