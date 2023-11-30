const { openDb } = require('./openDb');

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