const mongoose = require('mongoose');
const User = require('../models/user');

async function deletedata() {
  const mongoDB = 'mongodb://127.0.0.1:27017/test';
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  await User.deleteMany({}, (err) => {
    if (err) console.log(err);
  });
  await mongoose.connection.close();
}
deletedata();
