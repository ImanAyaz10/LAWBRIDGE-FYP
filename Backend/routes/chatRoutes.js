const express = require('express');
const router = express.Router();
const { sendMessage, getChatHistory, sendPersonalMessage, getPersonalMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, sendMessage);
router.get('/history', protect, getChatHistory);
// Personal messaging endpoints
router.post('/personal', protect, sendPersonalMessage);
router.get('/personal/:userId', protect, getPersonalMessages);

module.exports = router;
