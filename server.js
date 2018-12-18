const express = require('express');
const logger = require('./logger.js');

const app = express();
app.get('/', (req, res) => {
  res.status(200).send('ok');
});
const server = app.listen(3000, () => {
  console.log('app listening at port 8081');
  logger.log('info', 'listening');
});

module.exports = server;
