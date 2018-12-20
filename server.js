const express = require('express');
const logger = require('./logger.js');
const booksjson = require('./data/books.json');
const getDbData = require('./get_db_data.js');

const app = express();
const route = express.Router();
app.use(express.static('public'));
app.set('view engine', 'ejs');

route.use((req, res, next) => {
  logger.log('info', req.url);
  next();
});

route.get('/', (req, res) => {
  res.status(200).render('home');
});

route.get('/books.ejs', (req, res) => {
  const promise = getDbData.getBooks();
  promise.then().spread((data) => {
    res.status(200).render('books', { booksjson, data });
  });
});

route.get('/authors.ejs', (req, res) => {
  const promise = getDbData.getAuthors();
  promise.then().spread((authordata) => {
    res.status(200).render('authors', { authordata });
  });
});

route.use('/bookisbn/:isbn', (req, res, next) => {
  const regex = /[0-9]+/;
  if (regex.test(req.params.isbn)) {
    const promise = getDbData.getBookByIsbn(req.params.isbn);
    promise.then().spread((bookData) => {
      if (bookData.length === 0) {
        res.status(500).send('BOOK NOT FOUND');
      } else next();
    });
  } else {
    res.status(500).send('BOOK NOT FOUND');
  }
});

route.get('/bookisbn/:isbn', (req, res) => {
  const isbnNo = req.params.isbn;
  const promise = getDbData.getBookByIsbn(isbnNo);
  promise.then().spread((bookData) => {
    res.status(200).render('book_details', { data: bookData });
  });
});

route.use('/author/:id', (req, res, next) => {
  const regex = /[0-9]+/;
  if (regex.test(req.params.id)) {
    const promise = getDbData.getAuthorById(req.params.id);
    promise.then().spread((authordata) => {
      if (authordata.length === 0) {
        res.status(500).send('AUTHOR NOT FOUND');
      } else next();
    });
  } else {
    res.status(500).send('AUTHOR NOT FOUND');
  }
});

route.get('/author/:id', (req, res) => {
  const promise = getDbData.getAuthorById(req.params.id);
  promise.then().spread((authordata) => {
    res.status(200).render('author_details', { data: authordata });
  });
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
