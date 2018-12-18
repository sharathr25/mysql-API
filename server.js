const express = require('express');
const logger = require('./logger.js');
const booksjson = require('./data/books.json');
const authorjson = require('./data/authors.json');
const getBook = require('./getBookDetails.js');
const getAuthor = require('./getAuthorDetails.js');

// console.log(booksjson);
const app = express();
// const router = express.Router();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
  logger.log('info', 'requested home page');
});
app.get('/books.ejs', (req, res) => {
  logger.log('info', 'requested books page');
  res.render('books', { booksjson });
});
app.get('/authors.ejs', (req, res) => {
  logger.log('info', 'requested authors page');
  res.render('authors', { authorjson });
});
app.get('/bookisbn/:isbn', (req, res) => {
  // res.send(req.params.id);
  const isbnNo = req.params.isbn;
  res.render('book_details', { data: getBook(isbnNo) });
});
app.get('/author/:authorName', (req, res) => {
  console.log(req.params.authorName);
  res.render('author_details', { data: getAuthor(req.params.authorName) });
});

const server = app.listen(3000, () => {
  console.log('app listening at port 3000');
  logger.log('info', 'listening');
});

module.exports = server;
