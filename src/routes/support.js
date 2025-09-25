const path = require('path');
const express = require('express');
const router = express.Router();
const db = require('../config/database');

async function ensureSupportTable(){
  await db.query(`CREATE TABLE IF NOT EXISTS support_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    user_id INT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_user (user_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
}

router.get('/', async (req, res) => {
  res.render('support/index', { title: 'الدعم الفني' });
});

router.post('/', async (req, res) => {
  try {
    await ensureSupportTable();
    const { email, subject, message } = req.body;
    if(!email || !subject || !message) return res.status(400).json({ message: 'بيانات ناقصة' });
    if(subject.length > 255) return res.status(400).json({ message: 'العنوان طويل جداً' });
    if(message.length < 10) return res.status(400).json({ message: 'الرسالة قصيرة جداً' });
    let userId = (req.session && req.session.user && req.session.user.id) || null;
    await db.query('INSERT INTO support_tickets (email, subject, message, user_id) VALUES (?, ?, ?, ?)', [email, subject, message, userId]);
    res.json({ message: 'تم إرسال التذكرة بنجاح' });
  } catch(e){
    console.error(e);
    res.status(500).json({ message: 'تعذر إنشاء التذكرة' });
  }
});

module.exports = router;
