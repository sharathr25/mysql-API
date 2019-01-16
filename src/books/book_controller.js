const db = require('../common/get_db_data.js');

async function getBooksData() {
  const sql = 'select b.*,a.name from books as b,authors as a where b.author_id=a.id';
  return db.executeQuery(sql);
}

async function getBookDataByIsbn(isbn) {
  const sql = 'select b.*,a.name from books as b,authors as a where b.isbn=? AND b.author_id=a.id';
  return db.executeQuery(sql, [isbn]);
}

async function updateBookDataByIsbn(isbn, book) {
  const parameters = [
    book.title,
    book.subtitle,
    book.publishedOn,
    book.publisher,
    book.pages,
    book.description,
    isbn,
  ];
  const sql = `update books 
               set 
               title=?,
               subtitle=?,
               published=?,
               publisher=?,
               pages=?,
               description=? where isbn=?;`;
  return db.executeQuery(sql, parameters);
}

async function insertBookData(book) {
  const parameters = [
    book.isbn,
    book.title,
    book.subtitle,
    book.publishedOn,
    book.publisher,
    book.pages,
    book.description,
    book.imgsrc,
    book.id,
  ];
  const sql = 'insert into books values(?,?,?,?,?,?,?,?,?);';
  return db.executeQuery(sql, parameters);
}

async function deleteBookData(isbn) {
  const sql = 'delete from books where isbn=?';
  return db.executeQuery(sql, [isbn]);
}

module.exports = {
  getBooks: getBooksData,
  getBookByIsbn: getBookDataByIsbn,
  updateBookByIsbn: updateBookDataByIsbn,
  insertBook: insertBookData,
  deleteBook: deleteBookData,
};
