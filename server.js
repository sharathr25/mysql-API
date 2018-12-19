const express = require('express');
const logger = require('./logger.js');
const booksjson = require('./data/books.json');
const authorjson = require('./data/authors.json');
const getBook = require('./getBookDetails.js');
const getAuthor = require('./getAuthorDetails.js');

const app = express();
const route = express.Router();
app.use(express.static('public'));
app.set('view engine', 'ejs');

route.get('/', (req, res) => {
  res.status(200).render('home');
  logger.log('info', 'requested home page');
});
route.get('/books.ejs', (req, res) => {
  logger.log('info', 'requested books page');
  res.status(200).render('books', { booksjson });
});
route.get('/authors.ejs', (req, res) => {
  logger.log('info', 'requested authors page');
  res.status(200).render('authors', { authorjson });
});
route.use('/bookisbn/:isbn', (req, res, next) => {
  if (getBook(req.params.isbn) === 'not found') {
    res.status(500).send('Book not found');
  } else { next(); }
});

route.get('/bookisbn/:isbn', (req, res) => {
  const isbnNo = req.params.isbn;
  const bookData = getBook(isbnNo);
  const authorIdNo = getAuthor(bookData.author).id;
  res.status(200).render('book_details', { data: bookData, authorId: authorIdNo });
});

route.use('/author/:id', (req, res, next) => {
  if (getAuthor(req.params.id) === 'not found') {
    res.status(500).send('Author not found');
  } else { next(); }
});
route.get('/author/:id', (req, res) => {
  res.status(200).render('author_details', { data: getAuthor(req.params.id) });
});

route.get('*', (req, res) => {
  res.status(404).render('error');
});
const server = app.listen(3000, () => {
  console.log('app listening at port 3000');
  logger.log('info', 'listening');
});

app.use('/', route);

module.exports = server;
