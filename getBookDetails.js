// const booksjson = require('./data/books.json');

function getBookDetails(isbn, booksjson) {
  const book = booksjson.books.filter(books => books.isbn === isbn);
  if (book.length === 0) {
    return 'not found';
  }
  return book[0];
}

module.exports = getBookDetails;
