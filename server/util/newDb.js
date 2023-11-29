const { openDb } = require('./openDb');

async function newDb() {
  const db = await openDb('./server/database.db');

  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    schoolID TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    admin INTEGER DEFAULT 0 NOT NULL,
    token TEXT
  )`);
  await db.run(`INSERT INTO users (schoolID, password_hash, admin) 
    SELECT 'testaccount', 'dfe2b81efc39922409696e9c8ded27f7551cb36417556cae0c7c7c4f661747fe', 0
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE schoolID = 'testaccount')
  `);
  await db.run(`INSERT INTO users (schoolID, password_hash, admin)
    SELECT 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 1
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE schoolID = 'admin')
  `);

  await db.exec(`CREATE TABLE IF NOT EXISTS defect_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT NOT NULL,
    date INTEGER NOT NULL,
    school_id TEXT NOT NULL,
    resolved_status INTEGER NOT NULL,
    hidden_status INTEGER NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_extension TEXT
  )`);
  await db.exec(`CREATE TABLE IF NOT EXISTS suggestion_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT NOT NULL,
    date INTEGER NOT NULL,
    school_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL
  )`);
  console.log('Database created');
}

module.exports = {
  newDb
}
