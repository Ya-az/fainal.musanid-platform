/**
 * @fileoverview نموذج الدروس - يتعامل مع البيانات المتعلقة بالدروس التعليمية
 * @module models/Lesson
 */

const db = require('../config/database');

/**
 * التأكد من وجود جدول الدروس في قاعدة البيانات وأنه محدث بآخر الأعمدة
 * @async
 * @function ensureLessonsTable
 * @returns {Promise<void>}
 */
async function ensureLessonsTable() {
  await db.query(`CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    category VARCHAR(100) NULL,
    level ENUM('beginner','intermediate','advanced') DEFAULT 'beginner',
    durationMinutes INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  // تأكد من وجود عمود الوصف في حال كان الجدول قديماً
  const [cols] = await db.query("SHOW COLUMNS FROM lessons LIKE 'description'");
  if (!cols || !cols.length) {
    await db.query('ALTER TABLE lessons ADD COLUMN description TEXT NULL AFTER slug');
  }
  const [catCol] = await db.query("SHOW COLUMNS FROM lessons LIKE 'category'");
  if(!catCol || !catCol.length){
    await db.query('ALTER TABLE lessons ADD COLUMN category VARCHAR(100) NULL AFTER description');
  }
  const [lvlCol] = await db.query("SHOW COLUMNS FROM lessons LIKE 'level'");
  if(!lvlCol || !lvlCol.length){
    await db.query("ALTER TABLE lessons ADD COLUMN level ENUM('beginner','intermediate','advanced') DEFAULT 'beginner' AFTER category");
  }
}

/**
 * الحصول على جميع الدروس المتاحة
 * @async
 * @function getAllLessons
 * @returns {Promise<Array>} قائمة بجميع الدروس
 */
async function getAllLessons() {
  await ensureLessonsTable();
  const [rows] = await db.query('SELECT * FROM lessons ORDER BY id ASC');
  return rows;
}

async function seedIfEmpty() {
  await ensureLessonsTable();
  const [rows] = await db.query('SELECT COUNT(*) as c FROM lessons');
  if (rows[0].c === 0) {
    await db.query(`INSERT INTO lessons (title, slug, description, category, level, durationMinutes) VALUES
      ('مقدمة في البرمجة','intro-programming','نظرة عامة على المفاهيم الأساسية وبيئة العمل.','أساسيات','beginner',30),
      ('المتغيرات وأنواع البيانات','variables-types','شرح المتغيرات وأنواع البيانات الشائعة وكيفية استخدامها.','أساسيات','beginner',25),
      ('الشروط والحلقات','conditions-loops','فهم التحكم في التدفق باستخدام الجمل الشرطية والحلقات.','منطق','beginner',40)
    `);
  }
}

module.exports = { getAllLessons, seedIfEmpty };