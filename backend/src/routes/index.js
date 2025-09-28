const path = require('path');
const express = require('express');
const router = express.Router();
function requireAuth(req, res, next) { if (req.session && req.session.user) return next(); return res.redirect('/auth/login'); }

// الصفحة الرئيسية
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

// صفحات عامة مختصرة المسار
router.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/faq.html'));
});

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/about-musanid.html'));
});

router.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/support/sp_index.html'));
});

// ملف شخصي (محمية)
router.get('/profile', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/profile.html'));
});

module.exports = router;