const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('./config/logger.js');
const bookRoute = require('./routes/books/book_route.js');
const authorRoute = require('./routes/authors/author_route.js');
const userRoute = require('./routes/users/users.js');

// setting up our app and route to handle requests
const app = express();
const route = express.Router();

// setting up public folder to serve static resources
app.use(express.static('public'));

// setting up our view engine
app.set('view engine', 'ejs');

// // create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

// whenver a URL comes we are logging
route.use((req, res, next) => {
  logger.log('info', req.url);
  next();
});

// to check session is set or not
function redirectLogin(req, res, next) {
  if (req.session.email === undefined) {
    res.status(200).render('login');
  } else { next(); }
}

// to validate from
function validateForm(req, res, next) {
  const keys = Object.keys(req.body);
  let valid = true;
  for (let i = 0; i < keys.length; i += 1) {
    if (req.body[keys[i]].length === 0) {
      valid = false;
      console.log(`${keys[i]} is empty`);
      res.send(`<strong>${keys[i]}</strong> is empty PLEASE GO BACK AND FILL <strong>${keys[i]}</strong>`);
      break;
    }
  }
  if (valid) { next(); }
}

// to render index page for localhost:port/
route.get('/', (req, res) => {
  res.status(200).render('index');
});

// to render home page for localhost:port/home
route.get('/home', redirectLogin, (req, res) => {
  res.status(200).render('home', { data: req.session.name });
});

// to render login page for localhost:port/login
app.get('/login', redirectLogin, userRoute);

// to render register page for localhost:port/register
app.get('/register', userRoute);

// to render books page for localhost:port/books
app.get('/books', redirectLogin, bookRoute);

// to render authors page for localhost:port/authors
app.get('/authors', redirectLogin, authorRoute);

// to test isbn number which comes from url like localhost:port/bookisbn/isbn_no as req.params
app.use('/bookisbn/:isbn', bookRoute);

// to render book_details page based on isbn_no for url like localhost:port/bookisbn/isbn_no
app.get('/bookisbn/:isbn', bookRoute);

// to render book_datails page based author_id for url localhost:port/bookbyauthor/author_id
app.get('/bookbyauthor/:authorid', bookRoute);

// to test author id which comes from url like localhost:port/bookisbn/isbn_no as req.params
app.use('/author/:id', authorRoute);

// to render author_details page based on id from url localhost:port/id
app.get('/author/:id', authorRoute);

// to add user to db whenever user registers
app.post('/addUser', validateForm, userRoute);

// to check user whenever a user logs in
app.post('/checkuser', validateForm, userRoute);

app.get('/logout', userRoute);

// to render a error page non of the url hits
route.get('*', (req, res) => {
  res.status(404).render('error');
});

// settin our app to listen for requests
const port = 4000;
const server = app.listen(port, () => {
  logger.log('info', `app listening at port ${port}`);
});

// setting app to use route to handle url requests
app.use('/', route);

module.exports = server;
