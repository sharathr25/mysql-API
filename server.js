const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('./config/logger.js');

const bookRoute = require('./routes/books/book_route.js');
const authorRoute = require('./routes/authors/author_route.js');
const userRoute = require('./routes/users/users.js');
const routes = require('./routes/routes.js');
const middleware = require('./routes/common/middleware.js');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(middleware.clearCache);

// whenver a URL comes we are logging
app.use(middleware.logUrl);

app.use(bookRoute);
app.use(authorRoute);
app.use(userRoute);
app.use(routes);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  logger.log('info', `app listening at port ${port}`);
});

module.exports = server;
