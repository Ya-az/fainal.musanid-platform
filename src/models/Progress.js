/**
 * @fileoverview نموذج التقدم - يتعامل مع بيانات تقدم المستخدمين في الدروس
 * @module models/Progress
 */

const db = require('../config/database');

/**
 * التأكد من وجود جدول تقدم الدروس في قاعدة البيانات
 * @async
 * @function ensureProgressTable
 * @returns {Promise<void>}
 */
async function ensureProgressTable() {
  await db.query(`CREATE TABLE IF NOT EXISTS lessons_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_user_lesson (user_id, lesson_id),
    INDEX idx_user (user_id),
    CONSTRAINT fk_progress_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
}

/**
 * الحصول على خريطة تقدم المستخدم (الدروس المكتملة)
 * @async
 * @function getUserProgressMap
 * @param {number} userId - معرف المستخدم
 * @returns {Promise<Set<number>>} مجموعة تحتوي على معرفات الدروس المكتملة
 */
async function getUserProgressMap(userId) {
  await ensureProgressTable();
  const [rows] = await db.query('SELECT lesson_id FROM lessons_progress WHERE user_id=?', [userId]);
  const map = new Set(rows.map(r => r.lesson_id));
  return map;
}

/**
 * تعليم درس كمكتمل للمستخدم
 * @async
 * @function markLessonCompleted
 * @param {number} userId - معرف المستخدم
 * @param {number} lessonId - معرف الدرس
 * @returns {Promise<void>}
 */
async function markLessonCompleted(userId, lessonId) {
  await ensureProgressTable();
  await db.query('INSERT IGNORE INTO lessons_progress (user_id, lesson_id) VALUES (?, ?)', [userId, lessonId]);
}

/**
 * إلغاء تعليم درس كمكتمل للمستخدم
 * @async
 * @function unmarkLessonCompleted
 * @param {number} userId - معرف المستخدم
 * @param {number} lessonId - معرف الدرس
 * @returns {Promise<void>}
 */
async function unmarkLessonCompleted(userId, lessonId) {
  await ensureProgressTable();
  await db.query('DELETE FROM lessons_progress WHERE user_id=? AND lesson_id=?', [userId, lessonId]);
}

module.exports = { ensureProgressTable, getUserProgressMap, markLessonCompleted, unmarkLessonCompleted };