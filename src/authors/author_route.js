const express = require('express');
const author = require('./author_controller.js');
const middleware = require('../common/middleware.js');

const route = express.Router();

route.get('/authors', middleware.redirectLogin, async (req, res) => {
  try {
    const data = await author.getAuthors();
    res.status(200).render('authors', { authordata: data[0] });
  } catch (err) {
    res.status(200).send('some error happend please go back');
  }
});

route.get('/author/:id', middleware.redirectLogin, async (req, res) => {
  const authorId = req.params.id;
  const regex = /[0-9]+/;
  if (regex.test(authorId)) {
    const data = await author.getAuthorById(authorId);
    if (typeof data !== 'undefined' && data[0].length === 0) {
      res.status(404).send('AUTHOR NOT FOUND');
    } else res.status(200).render('author_details', { data: data[0] });
  } else {
    res.status(404).send('AUTHOR NOT FOUND');
  }
});

module.exports = route;
