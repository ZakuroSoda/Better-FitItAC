const { openDb } = require('./openDb');

async function getSuggestionReports(schoolId) {
  const db = await openDb('./server/database.db');
  let reports = await db.all('SELECT * FROM suggestion_reports WHERE school_id = ?', schoolId);
  for (let i = 0; i < reports.length; i++) {
    reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
    delete reports[i].id;
    delete reports[i].school_id;
  }
  return reports;
}

async function getSuggestionReportsAll() {
  const db = await openDb('./server/database.db');
  let reports = await db.all('SELECT * FROM suggestion_reports');
  for (let i = 0; i < reports.length; i++) {
    reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
    delete reports[i].id;
  }
  return reports;
}

module.exports = {
  getSuggestionReports,
  getSuggestionReportsAll
}