const mongoose = require('mongoose');
const User = require('../models/user');

const mongoDB = 'mongodb://127.0.0.1:27017/test';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

async function show() {
  const data = await User.find({});
  console.log(data);
  mongoose.connection.close();
}

show();
