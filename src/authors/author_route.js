const express = require('express');
const author = require('./author_controller.js');

const route = express.Router();

route.get('/api/authors', async (req, res) => {
  try {
    const data = await author.getAuthors();
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(200).send('some error happend please go back');
  }
});

route.post('/api/authors', async (req, res) => {
  const authorData = req.body;
  try {
    await author.insertAuthor(authorData);
    res.status(200).send('author inserted');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.put('/api/authors/:id', async (req, res) => {
  const idNo = req.params.id;
  const authorData = req.body;
  try {
    await author.updateAuthorById(idNo, authorData);
    res.status(200).send('author updated');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.delete('/api/authors/:id', async (req, res) => {
  const idNo = req.params.id;
  try {
    await author.deleteAuthorById(idNo);
    res.status(200).send('author deleted');
  } catch (error) {
    res.status(500).send('some error happend please go back');
  }
});

route.get('/api/authors/:id', async (req, res) => {
  const authorId = req.params.id;
  const regex = /[0-9]+/;
  if (regex.test(authorId)) {
    const data = await author.getAuthorById(authorId);
    if (typeof data !== 'undefined' && data[0].length === 0) {
      res.status(404).send('AUTHOR NOT FOUND');
    } else res.status(200).json(data[0]);
  } else {
    res.status(404).send('AUTHOR NOT FOUND');
  }
});

module.exports = route;
