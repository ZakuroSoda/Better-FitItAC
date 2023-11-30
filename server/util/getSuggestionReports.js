const { openDb } = require('./openDb');

async function getSuggestionReports(schoolId) {
  const db = await openDb('./server/database.db');
  let reports = await db.all('SELECT uid, date, title, description FROM suggestion_reports WHERE school_id = ?', schoolId);
  for (let i = 0; i < reports.length; i++) {
    reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
  }
  return reports;
}

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