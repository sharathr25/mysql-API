const express = require('express');
const user = require('./user_controller.js');
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

route.post('/login', middleware.validateLogin, async (req, res) => {
  const formData = req.body;
  const data = await user.findUser(formData);
  if (data.length > 0) {
    if (user.comparePassword(formData.password, data[0])) {
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

route.post('/signup', middleware.validateSignUp, async (req, res) => {
  const formData = req.body;
  if (user.checkPasswordMismatch(formData.password, formData.password1) === true) {
    res.status(200).send('<strong>password mismatch</strong> PLEASE GO BACK AND FILL PROPERLY');
    return;
  }
  const data = await user.findUser(formData);
  if (data.length === 0) {
    user.addUser(formData);
    res.status(200).render('login');
  } else { res.status(200).send('your already registered please <a href="/login">LOGIN</a>'); }
});

module.exports = route;
