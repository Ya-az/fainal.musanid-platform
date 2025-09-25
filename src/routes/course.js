const express = require('express');
const router = express.Router();
const { getAllLessons } = require('../models/Lesson');
const { getUserProgressMap, markLessonCompleted } = require('../models/Progress');

function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/auth/login');
}

router.get('/', requireAuth, async (req, res) => {
  try {
    const lessons = await getAllLessons();
    const progressMap = await getUserProgressMap(req.session.user.id);
    const normalized = lessons.map(l => ({
      id: l.id,
      title: l.title,
      slug: l.slug,
      duration: l.durationMinutes + ' دقيقة',
      category: l.category,
      level: l.level,
      completed: progressMap.has(l.id)
    }));
    res.render('course/index', { title: 'الدورات', lessons: normalized });
  } catch (e) {
    console.error(e);
    res.status(500).render('course/index', { title: 'الدورات', lessons: [] });
  }
});

router.get('/:slug', requireAuth, async (req, res) => {
  try {
    const slug = req.params.slug;
    const lessons = await getAllLessons();
    const lesson = lessons.find(l => l.slug === slug);
    if (!lesson) return res.status(404).render('course/show', { title: 'غير موجود', lesson: null });
    const progressMap = await getUserProgressMap(req.session.user.id);
    const completed = progressMap.has(lesson.id);
  res.render('course/show', { title: lesson.title, lesson, completed });
  } catch (e) {
    console.error(e);
    res.status(500).render('course/show', { title: 'خطأ', lesson: null, completed: false });
  }
});

router.post('/:slug/complete', requireAuth, async (req, res) => {
  try {
    const slug = req.params.slug;
    const lessons = await getAllLessons();
    const lesson = lessons.find(l => l.slug === slug);
    if (!lesson) return res.status(404).json({ message: 'الدرس غير موجود' });
    await markLessonCompleted(req.session.user.id, lesson.id);
    res.json({ message: 'تم تعليم الدرس كمكتمل' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'خطأ أثناء تحديث التقدم' });
  }
});

module.exports = router;
