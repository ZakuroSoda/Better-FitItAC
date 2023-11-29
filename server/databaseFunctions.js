const { newDb } = require('./util/newDb');
const { login } = require('./util/login');
const { authenticate } = require('./util/authenticate');
const { newDefectReport, newDefectPhoto } = require('./util/newDefectReport');
const { newSuggestionReport } = require('./util/newSuggestionReport');
const { getDefectReports, getDefectReportsAll } = require('./util/getDefectReports');
const { getSuggestionReports, getSuggestionReportsAll } = require('./util/getSuggestionReports');
const { resolveDefectReport, unresolveDefectReport, hideDefectReport } = require('./util/editDefectReport');

module.exports = {
  newDb,
  login,
  authenticate,
  newDefectReport,
  newDefectPhoto,
  newSuggestionReport,
  getDefectReports,
  getDefectReportsAll,
  getSuggestionReports,
  getSuggestionReportsAll,
  resolveDefectReport,
  unresolveDefectReport,
  hideDefectReport
}
