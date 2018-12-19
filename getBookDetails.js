const booksjson = require('./data/books.json');

const getBookDetails = (isbn) => {
  let index = -1;
  for (let i = 0; i < booksjson.books.length; i += 1) {
    if (isbn === booksjson.books[i].isbn) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    return 'not found';
  }
  return booksjson.books[index];
};

module.exports = getBookDetails;
