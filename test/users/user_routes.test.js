const request = require('supertest');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

describe('loading express', () => {
  let server;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../server.js');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /signup', (done) => {
    request(server)
      .get('/signup')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('Username:');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /signup', (done) => {
    request(server)
      .post('/signup')
      .send('username=abcd')
      .send('email=abcd@gmail.com')
      .send('password=1234')
      .send('password1=1234')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('your already registered');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /login', (done) => {
    request(server)
      .post('/login')
      .send('email=abcd@gmail.com')
      .send('password=1234')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('Welcome');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /login with valid email and password', (done) => {
    request(server)
      .post('/login')
      .send('email=abcd@gmail.com')
      .send('password=1234')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('Welcome');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /login with invalid email', (done) => {
    request(server)
      .post('/login')
      .send('email=a@gmail.com')
      .send('password=1234')
      .expect(401)
      .end((err, res) => {
        expect(res.text).to.have.string('Your not in our db');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /login with valid email and invalid password', (done) => {
    request(server)
      .post('/login')
      .send('email=abcd@gmail.com')
      .send('password=3467')
      .expect(401)
      .end((err, res) => {
        expect(res.text).to.have.string('incorrect password');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /login with empty email', (done) => {
    request(server)
      .post('/login')
      .send('email=')
      .send('password=')
      .expect(200)
      .end((err, res) => {
        console.log(res.text);
        expect(res.text).to.have.string('email not correct');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /login', (done) => {
    request(server)
      .get('/login')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('Email:');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /logout', (done) => {
    request(server)
      .get('/logout')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('WEBBOOK');
        console.log('----------------------------------------------');
        done();
      });
  });
});
