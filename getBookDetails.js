const booksjson = require('./data/books.json');

const getBookDetails = (isbn) => {
  let index;
  for (let i = 0; i < booksjson.books.length; i += 1) {
    if (isbn === booksjson.books[i].isbn) {
      index = i;
      break;
    }
  }
  return booksjson.books[index];
};

module.exports = getBookDetails;
