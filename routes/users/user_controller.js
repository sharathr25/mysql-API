const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

function hash(data) {
  const saltRounds = 10;
  return bcrypt.hashSync(data, saltRounds);
}

let mongoDB;
async function getConnection() {
  const url = 'mongodb://127.0.0.1:27017/users';
  const testUrl = `mongodb://127.0.0.1:27017/${process.env.DATABASE}`;
  mongoDB = typeof process.env.DATABASE !== 'undefined' ? testUrl : url;
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
}

async function addUsertoDb(userFormData) {
  getConnection();
  const hashPassword = hash(userFormData.password);
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: `${userFormData.username}`,
    email: `${userFormData.email}`,
    password: `${hashPassword}`,
  });
  let data;
  try {
    data = await user.save();
  } catch (err) {
    console.log('some error occurred');
  }
  await mongoose.connection.close();
  return data;
}

async function findUserFromDb(user) {
  getConnection();
  let data;
  try {
    data = await User.find({ email: `${user.email}` });
  } catch (err) {
    console.log('some error occurred');
  }
  await mongoose.connection.close();
  return data;
}

async function checkPassword(password1, password2) {
  if (password1 === password2) {
    return false;
  }
  return true;
}

module.exports = {
  addUser: addUsertoDb,
  findUser: findUserFromDb,
  checkPasswordMismatch: checkPassword,
};
