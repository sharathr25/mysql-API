const express = require('express');
const getBookDbData = require('./book_controller.js');

const route = express.Router();

// to render books page for localhost:port/books
module.exports = route.get('/books', async (req, res) => {
  const booksData = await getBookDbData.getBooks();
  res.status(200).render('books', { data: booksData[0] });
});

module.exports = route.use('/bookisbn/:isbn', async (req, res, next) => {
  const regex = /[0-9]+/;
  if (regex.test(req.params.isbn)) {
    const bookData = await getBookDbData.getBookByIsbn(req.params.isbn);
    if (bookData[0].length === 0) {
      res.status(500).send('BOOK NOT FOUND');
    } else next();
  } else {
    res.status(500).send('BOOK NOT FOUND');
  }
});

module.exports = route.get('/bookisbn/:isbn', async (req, res) => {
  const isbnNo = req.params.isbn;
  const bookData = await getBookDbData.getBookByIsbn(isbnNo);
  res.status(200).render('book_details', { data: bookData[0] });
});

module.exports = route.get('/bookbyauthor/:authorid', async (req, res) => {
  const authorId = req.params.authorid;
  const bookData = await getBookDbData.getBookById(authorId);
  res.status(200).render('book_details', { data: bookData });
});
