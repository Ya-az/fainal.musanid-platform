const path = require('path');
const express = require('express');
const router = express.Router();

// الصفحة الرئيسية
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/hp_index.html'));
});

// صفحات عامة مختصرة المسار
router.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/faq.html'));
});

router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/about.html'));
});

router.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/support/sp_index.html'));
});

module.exports = router;
