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
    const user = await db.get('SELECT schoolID FROM users WHERE token = ?', token);
    if (user) {
        return user.schoolID;
    }
    return null;
}

/*
CREATE TABLE defect_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT NOT NULL,
    date INTEGER NOT NULL,
    school_id TEXT NOT NULL,
    resolved_status INTEGER NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_extension TEXT
);
*/

async function newdefectreport (defectReport) {
    const db = await openDb('./server/database.db');
    const uid = uuidv4().replace(/[\r\n]+/g, '');
    await db.run(
        `INSERT INTO 
            defect_reports
            (uid, date, school_id, resolved_status, title, category, location, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, 
        uid,
        Date.now(),
        defectReport.schoolID,
        0,
        defectReport.title,
        defectReport.category,
        defectReport.location,
        defectReport.description
    );
    return uid;
}

async function newdefectphoto (uid, ext) {
    const db = await openDb('./server/database.db');
    await db.run(`UPDATE defect_reports
    SET image_extension = ? WHERE uid = ?`,
    ext, uid);
}

/*
CREATE TABLE suggestion_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid TEXT NOT NULL,
    date INTEGER NOT NULL,
    school_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);
*/

async function newsuggestionreport (suggestionReport) {
    const db = await openDb('./server/database.db');
    const uid = uuidv4().replace(/[\r\n]+/g, '');
    await db.run(
        `INSERT INTO 
            suggestion_reports
            (uid, date, school_id, title, description)
            VALUES (?, ?, ?, ?, ?)
        `, 
        uid,
        Date.now(),
        suggestionReport.schoolID,
        suggestionReport.title,
        suggestionReport.description
    );
    return uid;
}

async function getdefectreports (schoolID) {
    const db = await openDb('./server/database.db');
    let reports = await db.all('SELECT * FROM defect_reports WHERE school_id = ?', schoolID);
    for (let i = 0; i < reports.length; i++) {
        reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
        reports[i].resolved_status = reports[i].resolved_status === 0 ? 'Open' : 'Resolved';
        delete reports[i].id;
        delete reports[i].school_id;
        delete reports[i].image_extension;
        delete reports[i].description;
    }
    return reports;
}

module.exports = {
    login,
    authenticate,
    newdefectreport,
    newdefectphoto,
    newsuggestionreport,
    getdefectreports
};
