const path = require('path');
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const router = express.Router();

// صفحات الواجهة
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'تسجيل الدخول' });
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'حساب جديد' });
});

// إنشاء جدول المستخدمين إن لم يكن موجوداً
async function ensureUsersTable() {
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
}

ensureUsersTable().catch(console.error);

// معالجة التسجيل
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).send('بيانات ناقصة');
    }
    // فحص قوة كلمة المرور
    const issues = [];
    if (password.length < 8) issues.push('يجب أن تكون 8 أحرف على الأقل');
    if (!/[A-Z]/.test(password)) issues.push('حرف كبير واحد على الأقل (A-Z)');
    if (!/[a-z]/.test(password)) issues.push('حرف صغير واحد على الأقل (a-z)');
    if (!/[0-9]/.test(password)) issues.push('رقم واحد على الأقل');
    if (!/[^A-Za-z0-9]/.test(password)) issues.push('رمز خاص واحد على الأقل');
    if (issues.length) {
      return res.status(400).send('كلمة المرور ضعيفة: ' + issues.join('، '));
    }
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, username, email, hashed]
    );
    // بدء جلسة
    req.session.user = { username, email, firstName, lastName };
    res.redirect('/dashboard');
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).send('اسم المستخدم أو البريد مستخدم مسبقاً');
    }
    console.error(err);
    res.status(500).send('خطأ في التسجيل');
  }
});

// معالجة الدخول
router.post('/login', async (req, res) => {
  try {
    const { userOrEmail, password } = req.body;
    if (!userOrEmail || !password) return res.status(400).send('بيانات ناقصة');
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1',
      [userOrEmail, userOrEmail]
    );
    const user = rows && rows[0];
    if (!user) return res.status(401).send('بيانات الاعتماد غير صحيحة');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).send('بيانات الاعتماد غير صحيحة');
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('خطأ في تسجيل الدخول');
  }
});

// تسجيل الخروج
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// بيانات المستخدم الحالي
router.get('/me', (req, res) => {
  if (req.session && req.session.user) return res.json(req.session.user);
  return res.status(401).json({ message: 'غير مسجل' });
});

module.exports = router;
