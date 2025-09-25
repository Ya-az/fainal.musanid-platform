const path = require('path');
const express = require('express');
const router = express.Router();
function requireAuth(req, res, next) { if (req.session && req.session.user) return next(); return res.redirect('/auth/login'); }

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
