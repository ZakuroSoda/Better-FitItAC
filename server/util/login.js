const { openDb } = require('./openDb');
const { v4: uuidv4 } = require('uuid');
const sha256 = require('js-sha256');

async function login(schoolID, password) {
  const db = await openDb('./server/database.db');
  const password_hash = sha256(password);
  const user = await db.get('SELECT * FROM users WHERE schoolID = ? AND password_hash = ?', schoolID, password_hash);
  if (user) {
    const token = uuidv4().replace(/[\r\n]+/g, '');
    await db.run('UPDATE users SET token = ? WHERE schoolID = ?', token, schoolID);
    return token;
  }
  return null;
}

module.exports = {
  login
}