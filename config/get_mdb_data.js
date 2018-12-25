const mongoose = require('mongoose');
const User = require('./models/user');

const mongoDB = 'mongodb://127.0.0.1:27017/users';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

async function addUsertoDb(userFormData) {
  // console.log(userFormData.password);
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: `${userFormData.username}`,
    email: `${userFormData.email}`,
    password: `${userFormData.password}`,
  });
  await user.save();
  // const data = await User.find({});
}

async function findUserFromDb(email) {
  return User.find({ email: `${email}` });
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
