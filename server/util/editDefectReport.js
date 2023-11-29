const { openDb } = require('./openDb');

async function resolveDefectReport(uid) {
  const db = await openDb('./server/database.db');
  await db.run('UPDATE defect_reports SET resolved_status = 1 WHERE uid = ?', uid);
}

async function unresolveDefectReport(uid) {
  const db = await openDb('./server/database.db');
  await db.run('UPDATE defect_reports SET resolved_status = 0 WHERE uid = ?', uid);
}

async function hideDefectReport(uid) {
  const db = await openDb('./server/database.db');
  await db.run('UPDATE defect_reports SET hidden_status = 1 WHERE uid = ?', uid);
}

module.exports = {
  resolveDefectReport,
  unresolveDefectReport,
  hideDefectReport
}