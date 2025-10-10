const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// الصفحة الرئيسية (EJS)
router.get('/', (req, res) => {
  res.render('home', { title: 'الرئيسية' });
});

// صفحات عامة مختصرة المسار
router.get('/faq', (req, res) => {
  res.render('static/faq', { title: 'الأسئلة الشائعة' });
});

router.get('/about', (req, res) => {
  res.render('static/about', { title: 'عن المنصة' });
});

router.get('/support', (req, res) => {
  res.render('support/index', { title: 'الدعم الفني' });
});

// ملف شخصي (محمية)
router.get('/profile', requireAuth, (req, res) => {
  res.render('profile', { title: 'الملف الشخصي' });
});

module.exports = router;
