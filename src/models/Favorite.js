const db = require('../config/database');

async function ensureFavoritesTable() {
  await db.query(`CREATE TABLE IF NOT EXISTS lessons_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_user_lesson_fav (user_id, lesson_id),
    INDEX idx_user_fav (user_id),
    CONSTRAINT fk_favorites_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
}

async function getUserFavoritesMap(userId) {
  await ensureFavoritesTable();
  const [rows] = await db.query('SELECT lesson_id FROM lessons_favorites WHERE user_id=?', [userId]);
  const map = new Set(rows.map(r => r.lesson_id));
  return map;
}

async function addFavorite(userId, lessonId) {
  await ensureFavoritesTable();
  await db.query('INSERT IGNORE INTO lessons_favorites (user_id, lesson_id) VALUES (?, ?)', [userId, lessonId]);
}

async function removeFavorite(userId, lessonId) {
  await ensureFavoritesTable();
  await db.query('DELETE FROM lessons_favorites WHERE user_id=? AND lesson_id=?', [userId, lessonId]);
}

module.exports = { ensureFavoritesTable, getUserFavoritesMap, addFavorite, removeFavorite };