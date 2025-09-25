const path = require('path');
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const router = express.Router();

function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/auth/login');
}

router.get('/', requireAuth, (req, res) => {
  res.render('settings/index', { title: 'الإعدادات' });
});

router.post('/profile', requireAuth, async (req, res) => {
  try {
    const { firstName, lastName, username, email } = req.body;
    if (!firstName || !lastName || !username || !email) return res.status(400).json({ message: 'بيانات ناقصة' });
    // حدّد المستخدم الحالي
    let userId = req.session.user.id;
    if (!userId) {
      const [rows] = await db.query('SELECT id FROM users WHERE username=? OR email=? LIMIT 1', [req.session.user.username, req.session.user.email]);
      if (!rows || !rows.length) return res.status(401).json({ message: 'جلسة غير صالحة' });
      userId = rows[0].id;
    }
    await db.query('UPDATE users SET firstName=?, lastName=?, username=?, email=? WHERE id=?', [firstName, lastName, username, email, userId]);
    // حدّث الجلسة
    req.session.user = { ...(req.session.user || {}), id: userId, firstName, lastName, username, email };
    res.json({ message: 'تم تحديث الملف الشخصي بنجاح' });
  } catch (e) {
    if (e && e.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'اسم المستخدم أو البريد مستخدم مسبقاً' });
    }
    console.error(e);
    res.status(500).json({ message: 'خطأ أثناء التحديث' });
  }
});

router.post('/password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ message: 'بيانات ناقصة' });
    const issues = [];
    if (newPassword.length < 8) issues.push('الطول >= 8');
    if (!/[A-Z]/.test(newPassword)) issues.push('حرف كبير');
    if (!/[a-z]/.test(newPassword)) issues.push('حرف صغير');
    if (!/[0-9]/.test(newPassword)) issues.push('رقم');
    if (!/[^A-Za-z0-9]/.test(newPassword)) issues.push('رمز خاص');
    if (issues.length) return res.status(400).json({ message: 'كلمة المرور ضعيفة: ' + issues.join('، ') });
    const [rows] = await db.query('SELECT * FROM users WHERE username=? OR email=? LIMIT 1', [req.session.user.username, req.session.user.email]);
    const user = rows && rows[0];
    if (!user) return res.status(401).json({ message: 'جلسة غير صالحة' });
    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) return res.status(401).json({ message: 'كلمة المرور الحالية غير صحيحة' });
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password=? WHERE id=?', [hashed, user.id]);
    res.json({ message: 'تم تحديث كلمة المرور' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'خطأ أثناء تحديث كلمة المرور' });
  }
});

module.exports = router;
