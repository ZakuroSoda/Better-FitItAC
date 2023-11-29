const { openDb } = require('./openDb');
const { v4: uuidv4 } = require('uuid');

async function newDefectReport(defectReport) {
  const db = await openDb('./server/database.db');
  const uid = uuidv4().replace(/[\r\n]+/g, '');
  await db.run(
    `INSERT INTO defect_reports
      (uid, date, school_id, resolved_status, hidden_status, title, category, location, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    uid,
    Date.now(),
    defectReport.schoolID,
    0,
    0,
    defectReport.title,
    defectReport.category,
    defectReport.location,
    defectReport.description
  );
  return uid;
}

async function newDefectPhoto(uid, ext) {
  const db = await openDb('./server/database.db');
  await db.run(`UPDATE defect_reports
    SET image_extension = ? WHERE uid = ?`,
    ext, uid);
}

module.exports = {
  newDefectReport,
  newDefectPhoto
}