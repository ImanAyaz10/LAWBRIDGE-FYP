const express = require('express');
const {
    bookAppointment,
    getMyAppointments,
    updateAppointmentStatus,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, bookAppointment);
router.get('/my', protect, getMyAppointments);
router.put('/:id', protect, updateAppointmentStatus);

module.exports = router;
