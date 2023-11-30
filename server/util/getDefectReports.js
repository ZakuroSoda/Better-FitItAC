const { openDb } = require('./openDb');

async function getDefectReports(schoolId) {
  const db = await openDb('./server/database.db');
  let reports = await db.all('SELECT uid, date, resolved_status, hidden_status, title, category, location FROM defect_reports WHERE school_id = ?', schoolId);
  for (let i = 0; i < reports.length; i++) {
    reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
    reports[i].resolved_status = reports[i].resolved_status === 0 ? 'Open' : 'Resolved';
  }
  return reports;
}

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