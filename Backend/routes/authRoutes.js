const express = require('express');
const { registerUser, verifyOTP, resendOTP, loginUser } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    upload.single('profileImage')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File is too large. Maximum allowed size is 10MB.' });
            }
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);

module.exports = router;
