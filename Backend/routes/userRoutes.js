const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, uploadProfileImage } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.post('/upload-image', protect, (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File is too large. Maximum allowed size is 10MB.' });
            }
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, uploadProfileImage);

module.exports = router;
