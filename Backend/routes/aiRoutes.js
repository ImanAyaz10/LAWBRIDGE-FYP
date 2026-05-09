const express = require('express');
const router = express.Router();
const { analyzeCase } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeCase);

module.exports = router;
