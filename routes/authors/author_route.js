const express = require('express');
const getAuthorDbData = require('./author_controller.js');

const route = express.Router();

module.exports = route.get('/authors', async (req, res) => {
  const data = await getAuthorDbData.getAuthors();
  res.status(200).render('authors', { authordata: data[0] });
});

module.exports = route.use('/author/:id', async (req, res, next) => {
  const regex = /[0-9]+/;
  if (regex.test(req.params.id)) {
    const authordata = await getAuthorDbData.getAuthorById(req.params.id);
    if (authordata[0].length === 0) {
      res.status(500).send('AUTHOR NOT FOUND');
    } else next();
  } else {
    res.status(500).send('AUTHOR NOT FOUND');
  }
});

module.exports = route.get('/author/:id', async (req, res) => {
  const authordata = await getAuthorDbData.getAuthorById(req.params.id, false);
  res.status(200).render('author_details', { data: authordata[0] });
});
