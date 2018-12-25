const mongoose = require('mongoose');
const User = require('../models/user');

const mongoDB = 'mongodb://127.0.0.1:27017/users';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

User.deleteMany({}, (err) => {
  if (err) console.log(err);
});
