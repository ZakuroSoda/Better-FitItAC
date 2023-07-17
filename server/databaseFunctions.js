const sqlite3 = require('sqlite3');
const { open }  = require('sqlite');
const { v4: uuidv4 } = require('uuid');

async function openDb (file) {
    return open({
        filename: file,
        driver: sqlite3.Database
    })
};

async function login (schoolID) {
    const db = await openDb('./server/database.db');
    const user = await db.get('SELECT * FROM users WHERE schoolID = ?', schoolID);
    if (user) {
        token = uuidv4().replace(/[\r\n]+/g, '');
        await db.run('UPDATE users SET token = ? WHERE schoolID = ?', token, schoolID);
        return token;
    }
    return null;
};

async function authenticate (token) {
    const db = await openDb('./server/database.db');
    const user = await db.get('SELECT * FROM users WHERE token = ?', token);
    if (user) {
        return user;
    }
    return null;
}

module.exports = {login, authenticate};