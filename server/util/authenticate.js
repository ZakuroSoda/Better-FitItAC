const { openDb } = require('./openDb');

/**
 * Authenticates user by session token
 * @param {string} token - Session token
 * @returns {object} - { school_id: string, admin: boolean }
 */

async function authenticate(token) {
  const db = await openDb('./server/database.db');
  const user = await db.get('SELECT school_id, admin FROM users WHERE token = ?', token);
  if (user) {
    return user;
  }
  return null;
}

module.exports = {
  authenticate
}