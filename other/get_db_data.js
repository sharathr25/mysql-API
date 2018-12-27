const mysql = require('mysql2/promise');
const ownerdata = require('./data/owner_data');
const testdata = require('./data/test_data');

async function executeQuery(userData, sql) {
  const connection = await mysql.createConnection(userData);
  const data = await connection.query(sql);
  connection.close();
  return data;
}

async function executePrepared(userData, sql, parameters) {
  const connection = await mysql.createConnection(userData);
  const data = await connection.execute(sql, parameters);
  connection.close();
  return data;
}

async function getBooksData(test) {
  const sql = 'select b.*,a.name from books as b,authors as a where b.author_id=a.id';
  if (test === true) {
    return executeQuery(testdata, sql);
  }
  return executeQuery(ownerdata, sql);
}

async function getBookDataByIsbn(isbn, test) {
  const sql = 'select b.*,a.name from books as b,authors as a where b.isbn=? AND b.author_id=a.id';
  if (test) {
    return executePrepared(testdata, sql, [isbn]);
  }
  return executePrepared(ownerdata, sql, [isbn]);
}

async function getAuthorsData(test) {
  const sql = 'select * from authors';
  if (test) {
    return executeQuery(testdata, sql);
  }
  return executeQuery(ownerdata, sql);
}

async function getAuthorDataById(id, test) {
  const sql = 'select a.*,b.* from authors as a,books as b where b.author_id=a.id and a.id=?';
  if (test) {
    return executePrepared(testdata, sql, [id]);
  }
  return executePrepared(ownerdata, sql, [id]);
}

async function getBookDataById(id, test) {
  const sql = 'select distinct b.* from books as b,authors as a where b.author_id=?';
  if (test) {
    return executePrepared(testdata, sql, [id]);
  }
  return executePrepared(ownerdata, sql, [id]);
}

module.exports = {
  getAuthors: getAuthorsData,
  getAuthorById: getAuthorDataById,
  getBooks: getBooksData,
  getBookByIsbn: getBookDataByIsbn,
  getBookById: getBookDataById,
};
