const db = require('../common/get_db_data.js');

async function getBooksData() {
  const sql = 'select b.*,a.name from books as b,authors as a where b.author_id=a.id';
  return db.executeQuery(sql);
}

async function getBookDataByIsbn(isbn) {
  const sql = 'select b.*,a.name from books as b,authors as a where b.isbn=? AND b.author_id=a.id';
  return db.executeQuery(sql, [isbn]);
}

module.exports = {
  getBooks: getBooksData,
  getBookByIsbn: getBookDataByIsbn,
};
