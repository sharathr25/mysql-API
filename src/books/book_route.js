const express = require('express');
const book = require('./book_controller.js');

const route = express.Router();

route.get('/api/books', async (req, res) => {
  try {
    const booksData = await book.getBooks();
    res.status(200).json(booksData[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send('some error happend please go back');
  }
});

route.post('/api/books', async (req, res) => {
  const bookData = req.body;
  try {
    await book.insertBook(bookData);
    res.status(200).send('book inserted');
  } catch (error) {
    console.log(error);
    res.status(500).send('some error happend please go back');
  }
});

route.put('/api/books/:isbn', async (req, res) => {
  const isbnNo = req.params.isbn;
  const bookData = req.body;
  try {
    await book.updateBookByIsbn(isbnNo, bookData);
    res.status(200).send('book updated');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.delete('/api/books/:isbn', async (req, res) => {
  const isbnNo = req.params.isbn;
  try {
    await book.deleteBook(isbnNo);
    res.status(200).send('book deleted');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.get('/api/books/:isbn', async (req, res) => {
  const isbnNo = req.params.isbn;
  const regex = /[0-9]+/;
  if (regex.test(isbnNo)) {
    const bookData = await book.getBookByIsbn(isbnNo);
    if (typeof bookData !== 'undefined' && bookData[0].length === 0) {
      res.status(500).send('BOOK NOT FOUND');
    } else {
      res.status(200).json(bookData[0]);
    }
  } else {
    res.status(500).send('BOOK NOT FOUND');
  }
});

module.exports = route;
