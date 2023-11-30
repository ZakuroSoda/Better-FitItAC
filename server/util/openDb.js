const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

/**
 * Opens database (file path relative to root app directory)
 * @param {string} file - Database file path
 * @returns {object} - Database object
 */

async function openDb(file) {
  return open({
    filename: file,
    driver: sqlite3.Database
  })
};

module.exports = {
  openDb
}
