const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('./config/logger.js');

const bookRoute = require('./src/books/book_route.js');
const authorRoute = require('./src/authors/author_route.js');
const userRoute = require('./src/users/user_routes.js');
const routes = require('./src/home_routes.js');
const middleware = require('./src/common/middleware.js');

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
