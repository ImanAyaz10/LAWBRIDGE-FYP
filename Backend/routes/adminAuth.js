const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminAuthController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// @route   POST /api/admin/login
// @desc    Admin login, returns JWT
router.post('/login', adminLogin);

module.exports = router;
