const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./config/logger.js');
const bookRoute = require('./src/books/book_route.js');
const authorRoute = require('./src/authors/author_route.js');
const middleware = require('./src/common/middleware.js');

const app = express();

// whenver a URL comes we are logging
app.use(middleware.logUrl);
app.use(bodyParser.json());
app.use(bookRoute);
app.use(authorRoute);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  logger.log('info', `app listening at port ${port}`);
});

module.exports = server;
