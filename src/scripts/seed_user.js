const bcrypt = require('bcryptjs');
const db = require('../config/database');

async function seed() {
  const username = 'yazeed';
  const email = 'yazeed@example.com';
  const password = 'yaz1122()';
  const hashed = await bcrypt.hash(password, 10);
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);

  const [rows] = await db.query('SELECT id FROM users WHERE username=? OR email=? LIMIT 1', [username, email]);
  if (rows && rows.length) {
    console.log('User already exists. Skipping.');
    process.exit(0);
  }
  await db.query('INSERT INTO users (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)',
    ['Yazeed', 'User', username, email, hashed]);
  console.log('Seeded user yazeed with provided password.');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
