const express = require('express');
const { analyzeCase, generateRoadmap } = require('../controllers/caseController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/analyze', protect, analyzeCase);
router.post('/roadmap/:id', protect, generateRoadmap);

module.exports = router;
