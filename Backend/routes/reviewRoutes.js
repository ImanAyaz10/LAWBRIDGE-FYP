const express = require('express');
const router = express.Router();
const { createReview, getLawyerReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createReview);
router.get('/:lawyerId', getLawyerReviews);

module.exports = router;
