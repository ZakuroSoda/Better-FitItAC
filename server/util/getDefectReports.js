const { openDb } = require('./openDb');

async function getDefectReports(schoolID) {
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

async function getDefectReportsAll() {
  const db = await openDb('./server/database.db');
  let reports = await db.all('SELECT * FROM defect_reports WHERE hidden_status = 0');
  for (let i = 0; i < reports.length; i++) {
    reports[i].date = new Date(reports[i].date).toISOString().split('T')[0];
    reports[i].resolved_status = reports[i].resolved_status === 0 ? 'Open' : 'Resolved';
    delete reports[i].id;
  }
  return reports;
}

module.exports = {
  getDefectReports,
  getDefectReportsAll
}