const db = require('mysql2-promise')();
const ownerdata = require('./data/owner_data');

function getBooksData() {
  db.configure(ownerdata);
  return db.query('select * from books');
}

function getBookDataByIsbn(isbn) {
  db.configure(ownerdata);
  return db.query(`select * from books where isbn=${isbn}`);
}

function getAuthorsData() {
  db.configure(ownerdata);
  return db.query('select * from authors');
}

function getAuthorDataById(key) {
  db.configure(ownerdata);
  return db.query(`select * from authors where id=${key}`);
}

module.exports = {
  getAuthors: getAuthorsData,
  getAuthorById: getAuthorDataById,
  getBooks: getBooksData,
  getBookByIsbn: getBookDataByIsbn,
};
