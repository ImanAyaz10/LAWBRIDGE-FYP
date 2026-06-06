const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getAllAppointments } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/users', protect, authorize('admin'), getAllUsers);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);
router.get('/appointments', protect, authorize('admin'), getAllAppointments);

module.exports = router;
