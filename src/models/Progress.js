const db = require('../config/database');

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

async function getUserProgressMap(userId) {
  await ensureProgressTable();
  const [rows] = await db.query('SELECT lesson_id FROM lessons_progress WHERE user_id=?', [userId]);
  const map = new Set(rows.map(r => r.lesson_id));
  return map;
}

async function markLessonCompleted(userId, lessonId) {
  await ensureProgressTable();
  await db.query('INSERT IGNORE INTO lessons_progress (user_id, lesson_id) VALUES (?, ?)', [userId, lessonId]);
}

async function unmarkLessonCompleted(userId, lessonId) {
  await ensureProgressTable();
  await db.query('DELETE FROM lessons_progress WHERE user_id=? AND lesson_id=?', [userId, lessonId]);
}

module.exports = { ensureProgressTable, getUserProgressMap, markLessonCompleted, unmarkLessonCompleted };