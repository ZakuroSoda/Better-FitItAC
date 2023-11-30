const { openDb } = require('./openDb');
const { v4: uuidv4 } = require('uuid');
const sha256 = require('js-sha256');

/**
 * Logs user in by school ID and password
 * @param {string} schoolId - User's school ID
 * @param {string} password - User's password
 * @returns {string} - Session token
 */

async function login(schoolId, password) {
  const db = await openDb('./server/database.db');
  const password_hash = sha256(password);
  const user = await db.get('SELECT * FROM users WHERE school_id = ? AND password_hash = ?', schoolId, password_hash);
  if (user) {
    const token = uuidv4().replace(/[\r\n]+/g, '');
    await db.run('UPDATE users SET token = ? WHERE school_id = ?', token, schoolId);
    return token;
  }
  return null;
}

module.exports = {
  login
}