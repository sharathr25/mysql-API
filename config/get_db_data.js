const mysql = require('mysql2/promise');
const ownerdata = require('./data/owner_data');
const testdata = require('./data/test_data');

// to execute queries and returns a promise which resolves to db data
async function executeQuery(sql) {
  let userData;
  if (process.env.test) {
    userData = testdata;
  } else {
    userData = ownerdata;
  }
  const connection = await mysql.createConnection(userData);
  const data = await connection.query(sql);
  connection.close();
  return data;
}

// to execute prepared queries and returns a promise which resolves to db data
async function executePrepared(sql, parameters) {
  let userData;
  if (process.env.test) {
    userData = testdata;
  } else {
    userData = ownerdata;
  }
  const connection = await mysql.createConnection(userData);
  const data = await connection.execute(sql, parameters);
  connection.close();
  return data;
}

async function getBooksData() {
  const sql = 'select b.*,a.name from books as b,authors as a where b.author_id=a.id';
  return executeQuery(sql);
}

async function getBookDataByIsbn(isbn) {
  const sql = 'select b.*,a.name from books as b,authors as a where b.isbn=? AND b.author_id=a.id';
  return executePrepared(sql, [isbn]);
}

async function getAuthorsData() {
  const sql = 'select * from authors';
  return executeQuery(sql);
}

async function getAuthorDataById(id) {
  const sql = 'select a.*,b.* from authors as a,books as b where b.author_id=a.id and a.id=?';
  return executePrepared(sql, [id]);
}

async function getBookDataById(id) {
  const sql = 'select distinct b.* from books as b,authors as a where b.author_id=?';
  return executePrepared(sql, [id]);
}

module.exports = {
  getAuthors: getAuthorsData,
  getAuthorById: getAuthorDataById,
  getBooks: getBooksData,
  getBookByIsbn: getBookDataByIsbn,
  getBookById: getBookDataById,
};
