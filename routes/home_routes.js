const express = require('express');
const middleware = require('./common/middleware.js');

const route = express.Router();

route.get('/', (req, res) => {
  res.status(200).render('index');
});
route.get('/home', middleware.redirectLogin, (req, res) => {
  res.status(200).render('home', { data: req.session.name });
});
// to render a error page non of the url hits
route.get('*', (req, res) => {
  res.status(404).render('error');
});

module.exports = route;
