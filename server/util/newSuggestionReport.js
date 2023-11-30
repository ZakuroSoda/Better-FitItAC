const { openDb } = require('./openDb');
const { v4: uuidv4 } = require('uuid');

/**
 * Creates new suggestion report
 * @param {object} suggestionReport - Suggestion report object
 * @returns {string} - UID of new suggestion report
 */

async function newSuggestionReport(suggestionReport) {
  const db = await openDb('./server/database.db');
  const uid = uuidv4().replace(/[\r\n]+/g, '');
  await db.run(
    `INSERT INTO suggestion_reports
      (uid, date, school_id, title, description)
      VALUES (?, ?, ?, ?, ?)`,
    uid,
    Date.now(),
    suggestionReport.schoolId,
    suggestionReport.title,
    suggestionReport.description
  );
  return uid;
}

module.exports = {
  newSuggestionReport
}
