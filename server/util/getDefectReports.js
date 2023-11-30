const { openDb } = require('./openDb');

/**
 * Gets all defect reports by user's school ID
 * @param {string} schoolId - User's school ID
 * @returns {object} - { uid: string, date: date, resolved_status: string, hidden_status: integer, title: string, category: string, location: string }[]
 */

async function getDefectReports(schoolId) {
  const db = await openDb('./server/database.db');
  let reports = await db.all('SELECT uid, date, resolved_status, hidden_status, title, category, location FROM defect_reports WHERE school_id = ?', schoolId);
  for (let i = 0; i < reports.length; i++) {
    reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
    reports[i].resolved_status = reports[i].resolved_status === 0 ? 'Open' : 'Resolved';
  }
  return reports;
}

/**
 * Gets all defect reports for the admins
 * @returns {object} - { uid: string, date: date, school_id: string, resolved_status: string, hidden_status: integer, title: string, category: string, location: string, description: string, image_extension: string }[]
 */

async function getDefectReportsAll() {
  const db = await openDb('./server/database.db');
  let reports = await db.all('SELECT uid, date, school_id, resolved_status, hidden_status, title, category, location, description, image_extension FROM defect_reports WHERE hidden_status = 0');
  for (let i = 0; i < reports.length; i++) {
    reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
    reports[i].resolved_status = reports[i].resolved_status === 0 ? 'Open' : 'Resolved';
  }
  return reports;
}

module.exports = {
  getDefectReports,
  getDefectReportsAll
}