const express = require('express');
const {
    bookAppointment,
    getMyAppointments,
    getAppointmentById,
    updateAppointmentStatus,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, bookAppointment);
router.get('/my', protect, getMyAppointments);
router.get('/:id', protect, getAppointmentById);
router.put('/:id', protect, updateAppointmentStatus);

module.exports = router;
