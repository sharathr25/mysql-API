const express = require('express');
const request = require('request');
const xml2js = require('xml2js');
const book = require('./book_controller.js');
const middleware = require('../common/middleware.js');

const route = express.Router();

route.get('/books', middleware.redirectLogin, async (req, res) => {
  try {
    const booksData = await book.getBooks();
    res.status(200).render('books', { data: booksData[0] });
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

const parser = new xml2js.Parser();
route.get('/bookisbn/:isbn', async (req, res) => {
  const isbnNo = req.params.isbn;
  const regex = /[0-9]+/;
  if (regex.test(isbnNo)) {
    const bookData = await book.getBookByIsbn(isbnNo);
    if (typeof bookData !== 'undefined' && bookData[0].length === 0) {
      res.status(500).send('BOOK NOT FOUND');
    } else {
      request(`https://www.goodreads.com/book/isbn/${isbnNo}?key=gNgo81UYk3FMNI5xF9qUsw&format=xml`, (error, responce, body) => {
        parser.parseString(body, (err, result) => {
          const rating = result.GoodreadsResponse.book[0].average_rating[0];
          const totalRatings = result.GoodreadsResponse.book[0].work[0].ratings_count[0]._;
          res.status(200).render('book_details', { data: bookData[0], rating, totalRatings });
        });
      });
    }
  } else {
    res.status(500).send('BOOK NOT FOUND');
  }
});

module.exports = route;
