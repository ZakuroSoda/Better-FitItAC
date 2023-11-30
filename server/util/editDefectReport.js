const { openDb } = require('./openDb');

/**
 * Resolves defect report referenced by UID
 * @param {string} uid - Defect report UID
 * @returns
 */

async function resolveDefectReport(uid) {
  const db = await openDb('./server/database.db');
  await db.run('UPDATE defect_reports SET resolved_status = 1 WHERE uid = ?', uid);
}

/**
 * Unresolves defect report referenced by UID
 * @param {string} uid - Defect report UID
 * @returns
 */

async function unresolveDefectReport(uid) {
  const db = await openDb('./server/database.db');
  await db.run('UPDATE defect_reports SET resolved_status = 0 WHERE uid = ?', uid);
}

/**
 * Hides defect report referenced by UID (only hides for admins)
 * @param {string} uid - Defect report UID
 * @returns
 */

async function hideDefectReport(uid) {
  const db = await openDb('./server/database.db');
  await db.run('UPDATE defect_reports SET hidden_status = 1 WHERE uid = ?', uid);
}

module.exports = {
  resolveDefectReport,
  unresolveDefectReport,
  hideDefectReport
}