const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function openDb(file) {
  return open({
    filename: file,
    driver: sqlite3.Database
  })
};

module.exports = {
  openDb
}
