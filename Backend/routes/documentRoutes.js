const express = require('express');
const router = express.Router();
const { uploadDocument, getDocuments } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, uploadDocument);
router.get('/', protect, getDocuments);

module.exports = router;
