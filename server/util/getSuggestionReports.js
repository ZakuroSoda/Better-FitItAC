const { openDb } = require('./openDb');

/**
 * Gets all suggestions by user's school ID
 * @param {string} schoolId 
 * @returns {object} - { uid: string, date: date, title: string, description: string }[]
 */

async function getSuggestionReports(schoolId) {
  const db = await openDb('./server/database.db');
  let reports = await db.all('SELECT uid, date, title, description FROM suggestion_reports WHERE school_id = ?', schoolId);
  for (let i = 0; i < reports.length; i++) {
    reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
  }
  return reports;
}

/**
 * Gets all suggestions for the admins
 * @returns  {object} - { uid: string, date: date, school_id: string, title: string, description: string }[]
 */

async function getSuggestionReportsAll() {
  const db = await openDb('./server/database.db');
  let reports = await db.all('SELECT uid, date, school_id, title, description FROM suggestion_reports');
  for (let i = 0; i < reports.length; i++) {
    reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
  }
  return reports;
}

module.exports = {
  getSuggestionReports,
  getSuggestionReportsAll
}