const express = require('express');
const logger = require('./logger.js');
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

route.get('/login', (req, res) => {
  res.status(200).render('login');
});

route.get('/register', (req, res) => {
  res.status(200).render('register');
});

route.get('/books.ejs', async (req, res) => {
  const booksData = await getDbData.getBooks(false);
  res.status(200).render('books', { data: booksData[0] });
});

route.get('/authors.ejs', async (req, res) => {
  const data = await getDbData.getAuthors();
  res.status(200).render('authors', { authordata: data[0] });
});

route.use('/bookisbn/:isbn', async (req, res, next) => {
  const regex = /[0-9]+/;
  if (regex.test(req.params.isbn)) {
    const bookData = await getDbData.getBookByIsbn(req.params.isbn, false);
    if (bookData[0].length === 0) {
      res.status(500).send('BOOK NOT FOUND');
    } else next();
  } else {
    res.status(500).send('BOOK NOT FOUND');
  }
});

route.get('/bookisbn/:isbn', async (req, res) => {
  const isbnNo = req.params.isbn;
  const bookData = await getDbData.getBookByIsbn(isbnNo);
  res.status(200).render('book_details', { data: bookData[0] });
});

route.get('/bookbyauthor/:authorid', async (req, res) => {
  const authorId = req.params.authorid;
  const bookData = await getDbData.getBookById(authorId);
  res.status(200).render('book_details', { data: bookData });
});

route.use('/author/:id', async (req, res, next) => {
  const regex = /[0-9]+/;
  if (regex.test(req.params.id)) {
    console.log(req.params.id);
    const authordata = await getDbData.getAuthorById(req.params.id, false);
    console.log(authordata[0].length);
    if (authordata[0].length === 0) {
      res.status(500).send('AUTHOR NOT FOUND');
    } else next();
  } else {
    res.status(500).send('AUTHOR NOT FOUND');
  }
});

route.get('/author/:id', async (req, res) => {
  const authordata = await getDbData.getAuthorById(req.params.id, false);
  res.status(200).render('author_details', { data: authordata[0] });
});

route.post('/adduser', (req, res) => {
  res.status(200).send('hello new user');
});

route.get('*', (req, res) => {
  res.status(404).render('error');
});

const server = app.listen(4000, () => {
  console.log('app listening at port 4000');
  logger.log('info', 'listening');
});

app.use('/', route);

module.exports = server;
