const mongoose = require('mongoose');
const User = require('../../models/user');

async function addUsertoDb(userFormData) {
  let mongoDB = 'mongodb://127.0.0.1:27017/users';
  if (process.env.test) {
    mongoDB = 'mongodb://127.0.0.1:27017/test';
  }
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: `${userFormData.username}`,
    email: `${userFormData.email}`,
    password: `${userFormData.password}`,
  });
  const data = await user.save();
  await mongoose.connection.close();
  return data;
}

async function findUserFromDb(email) {
  let mongoDB = 'mongodb://127.0.0.1:27017/users';
  if (process.env.test) {
    mongoDB = 'mongodb://127.0.0.1:27017/test';
  }
  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  const data = await User.find({ email: `${email}` });
  await mongoose.connection.close();
  return data;
}

module.exports = {
  addUser: addUsertoDb,
  findUser: findUserFromDb,
};

// addUsertoDb();

// User.deleteMany({ username: 'sharath' }, (err) => {
// if (err) console.log(err);
// });

// mongoose.connection.on('connected', () => {
//   console.log('connected');
// });
