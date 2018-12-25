const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const getMongoData = require('./user_controller.js');

const route = express.Router();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = route.get('/login', (req, res) => {
  console.log('from routes');
  res.status(200).render('login');
});

module.exports = route.get('/register', (req, res) => {
  console.log('from routes');
  res.status(200).render('register');
});

module.exports = route.get('/logout', (req, res) => {
  req.session.destroy();
  res.header('Cache-Control', 'no-cache');
  res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');
  res.status(200).render('index');
});

const saltRounds = 10;
module.exports = route.post('/checkuser', async (req, res) => {
  const user = req.body;
  const data = await getMongoData.findUser(user.email);
  if (data.length > 0) {
    if (bcrypt.compareSync(user.password, data[0].password)) {
      req.session.email = data[0].email;
      req.session.name = data[0].username;
      res.status(200).render('home', { data: req.session.name });
    } else {
      res.status(200).send('incorrect password');
    }
  } else {
    res.status(200).send('Your not in our db please <a href="/register">REGISTER</a>');
  }
});

module.exports = route.post('/adduser', async (req, res) => {
  const user = req.body;
  if (req.body.password !== req.body.password1) {
    res.status(200).send('<strong>password mismatch</strong> PLEASE GO BACK AND FILL PROPERLY');
    return;
  }
  user.password = bcrypt.hashSync(user.password, saltRounds);
  const data = await getMongoData.findUser(user.email);
  if (data.length === 0) {
    getMongoData.addUser(user);
    res.status(200).render('login');
  } else { res.status(200).send('your already registered please <a href="/login">LOGIN</a>'); }
});
