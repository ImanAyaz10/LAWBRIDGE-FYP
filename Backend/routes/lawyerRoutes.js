const express = require('express');
const { getLawyers, getLawyerById } = require('../controllers/lawyerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getLawyers);
router.get('/:id', protect, getLawyerById);

module.exports = router;

