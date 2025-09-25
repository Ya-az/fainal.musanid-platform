const express = require('express');
const router = express.Router();
const { getAllLessons } = require('../models/Lesson');
const { getUserProgressMap, markLessonCompleted, unmarkLessonCompleted } = require('../models/Progress');

function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.status(401).json({ message: 'غير مصرح' });
}

// GET /api/progress  -> current user progress summary
router.get('/progress', requireAuth, async (req, res) => {
  try {
    const lessons = await getAllLessons();
    const total = lessons.length;
    let completed = 0;
    if (total) {
      const progressMap = await getUserProgressMap(req.session.user.id);
      completed = progressMap.size;
      const includeLessons = req.query.include === 'lessons';
      if (includeLessons) {
        const list = lessons.map(l => ({ id: l.id, slug: l.slug, title: l.title, completed: progressMap.has(l.id), durationMinutes: l.durationMinutes }));
        const percent = total ? Math.round((completed / total) * 100) : 0;
        return res.json({ completed, total, percent, lessons: list });
      }
    }
    const percent = total ? Math.round((completed / total) * 100) : 0;
    res.json({ completed, total, percent });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'خطأ في جلب التقدم' });
  }
});

// POST /api/progress/:slug  -> mark lesson complete
router.post('/progress/:slug', requireAuth, async (req, res) => {
  try {
    const slug = req.params.slug;
    const lessons = await getAllLessons();
    const lesson = lessons.find(l => l.slug === slug);
    if (!lesson) return res.status(404).json({ message: 'الدرس غير موجود' });
    const progressMap = await getUserProgressMap(req.session.user.id);
    const already = progressMap.has(lesson.id);
    if (!already) {
      await markLessonCompleted(req.session.user.id, lesson.id);
    }
    // send updated summary
    const updatedMap = await getUserProgressMap(req.session.user.id);
    const total = lessons.length;
    const completed = updatedMap.size;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    res.json({ message: already ? 'مُسجل مسبقاً' : 'تم التعليم', lesson: { id: lesson.id, slug: lesson.slug }, completed, total, percent });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'خطأ أثناء تحديث التقدم' });
  }
});

// DELETE /api/progress/:slug  -> unmark lesson complete
router.delete('/progress/:slug', requireAuth, async (req, res) => {
  try {
    const slug = req.params.slug;
    const lessons = await getAllLessons();
    const lesson = lessons.find(l => l.slug === slug);
    if (!lesson) return res.status(404).json({ message: 'الدرس غير موجود' });
    await unmarkLessonCompleted(req.session.user.id, lesson.id);
    const updatedMap = await getUserProgressMap(req.session.user.id);
    const total = lessons.length;
    const completed = updatedMap.size;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    res.json({ message: 'تم إلغاء التعليم', lesson: { id: lesson.id, slug: lesson.slug }, completed, total, percent });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'خطأ أثناء تحديث التقدم' });
  }
});

module.exports = router;