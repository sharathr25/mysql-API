// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;
const user = require('../../routes/users/user_controller.js');

// testing users mongo db
describe('testing mongodb', () => {
  process.env.DATABASE = 'test';
  const userFormData = {
    username: 'abcd',
    email: 'abcd@gmail.com',
    password: '1234',
  };
  it('finding an user with valid email', async () => {
    const data = await user.findUser(userFormData);
    expect(data).to.be.an('array');
  });
  it('saving user data', async () => {
    const data = await user.addUser(userFormData);
    expect(data).to.be.an('object');
    expect(data.username).to.be.equal('abcd');
  });
  it('Not finding an user with invalid email', async () => {
    const data = await user.findUser('abc@gmail.com');
    expect(data).to.be.an('array');
    expect(data.length).to.be.equal(0);
  });
});
