const express = require('express');
const router = express.Router();
const { getAllLessons, seedIfEmpty } = require('../models/Lesson');
const { getUserProgressMap } = require('../models/Progress');

function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/auth/login');
}

router.get('/', requireAuth, async (req, res) => {
  try {
    await seedIfEmpty();
    const lessonsRows = await getAllLessons();

    let userId = req.session.user.id;
    if (!userId) {
      const db = require('../config/database');
      const [rows] = await db.query('SELECT id FROM users WHERE username=? OR email=? LIMIT 1', [req.session.user.username, req.session.user.email]);
      if (rows && rows[0]) {
        userId = rows[0].id;
        req.session.user.id = userId;
      }
    }

    const progressMap = userId ? await getUserProgressMap(userId) : new Set();
    const lessons = lessonsRows.map(r => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      duration: r.durationMinutes + ' دقيقة',
      completed: progressMap.has(r.id)
    }));
    const completed = lessons.filter(l => l.completed).length;
    const total = lessons.length;
    const progressPercent = total ? Math.round((completed / total) * 100) : 0;
    res.render('dashboard', {
      title: 'لوحة التحكم',
      lessons,
      completedLessons: completed,
      totalLessons: total,
      progressPercent
    });
  } catch (e) {
    console.error(e);
    res.status(500).render('dashboard', { title: 'لوحة التحكم', lessons: [], completedLessons: 0, totalLessons: 0, progressPercent: 0 });
  }
});

module.exports = router;
