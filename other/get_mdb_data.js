const mongoose = require('mongoose');
const User = require('../models/user');

const mongoDB = 'mongodb://127.0.0.1:27017/users';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

async function addUsertoDb(userFormData) {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: `${userFormData.username}`,
    email: `${userFormData.email}`,
    password: `${userFormData.password}`,
  });
  await user.save();
}

async function findUserFromDb(email) {
  return User.find({ email: `${email}` });
}

module.exports = {
  addUser: addUsertoDb,
  findUser: findUserFromDb,
};
