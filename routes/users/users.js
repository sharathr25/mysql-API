const express = require('express');
const bcrypt = require('bcrypt');
const { check } = require('express-validator/check');
const userData = require('./user_controller.js');
const middleware = require('../common/middleware.js');

const route = express.Router();

route.get('/login', (req, res) => {
  res.status(200).render('login');
});

route.get('/signup', (req, res) => {
  res.status(200).render('signup');
});

route.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).render('index');
});

const loginMiddlewares = [
  check('email').isEmail().withMessage('email not correct'),
  check('password').isLength({ min: 3 }).withMessage('password should me more than 4 charactes'),
  middleware.checkErrors,
];

route.post('/login', loginMiddlewares, async (req, res) => {
  const user = req.body;
  const data = await userData.findUser(user);
  if (data.length > 0) {
    if (bcrypt.compareSync(user.password, data[0].password)) {
      req.session.email = data[0].email;
      req.session.name = data[0].username;
      res.status(200).render('home', { data: data[0].username });
    } else {
      res.status(401).send('incorrect password');
    }
  } else {
    res.status(401).send('Your not in our db please <a href="/register">REGISTER</a>');
  }
});

const signupMiddlewares = [
  check('username').isLength({ min: 3 }).withMessage('Username shoud be more than 4 characters'),
  check('email').isEmail().withMessage('email not correct'),
  check('password').isLength({ min: 3 }).withMessage('password should me more than 4 charactes'),
  check('password1').isLength({ min: 3 }).withMessage('re-entered password should me more than 4 charactes'),
  middleware.checkErrors,
];

route.post('/signup', signupMiddlewares, async (req, res) => {
  const user = req.body;
  if (userData.checkPasswordMismatch(user.password, user.password1) === true) {
    res.status(200).send('<strong>password mismatch</strong> PLEASE GO BACK AND FILL PROPERLY');
    return;
  }
  const data = await userData.findUser(user);
  if (data.length === 0) {
    userData.addUser(user);
    res.status(200).render('login');
  } else { res.status(200).send('your already registered please <a href="/login">LOGIN</a>'); }
});

module.exports = route;
