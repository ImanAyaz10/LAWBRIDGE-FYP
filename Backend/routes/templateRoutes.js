const express = require('express');
const router = express.Router();
const { getTemplates, getTemplateByCode } = require('../controllers/templateController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getTemplates);
router.get('/:code', protect, getTemplateByCode);

module.exports = router;
