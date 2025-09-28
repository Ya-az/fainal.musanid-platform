const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// مسار لتقديم نموذج الاتصال
router.post('/contact', contactController.submitContactForm);

// مسار للاشتراك في النشرة الإخبارية
router.post('/newsletter', contactController.subscribeNewsletter);

module.exports = router;