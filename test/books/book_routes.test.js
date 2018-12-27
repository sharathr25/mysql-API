const request = require('supertest');
const session = require('supertest-session');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

describe('checking book routes', () => {
  let server;
  let testSession;
  let authenticatedSession;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../server.js');
    testSession = session(server);
  });
  beforeEach((done) => {
    testSession.post('/login')
      .send('email=abcd@gmail.com')
      .send('password=1234')
      .expect(200)
      .end(() => {
        authenticatedSession = testSession;
        return done();
      });
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /books -status 200', (done) => {
    authenticatedSession.get('/books')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('ISBN');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /bookisbn/valid isbn -status 200', (done) => {
    authenticatedSession.get('/bookisbn/123')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('DESCRIPTION');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /bookisbn/invalid isbn -status 500', (done) => {
    authenticatedSession.get('/bookisbn/100')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('BOOK NOT FOUND');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /books without loggin in', (done) => {
    request(server)
      .get('/books')
      .expect(403)
      .end((err, res) => {
        expect(res.text).to.have.string('requseted page is forbidden');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /bookisbn/isbn with valid isbn without loggin in', (done) => {
    request(server)
      .get('/bookisbn/123')
      .expect(403)
      .end((err, res) => {
        expect(res.text).to.have.string('requseted page is forbidden');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /books/isbn with invalid isbn without loggin in', (done) => {
    request(server)
      .get('/bookisbn/100')
      .expect(403)
      .end((err, res) => {
        expect(res.text).to.have.string('requseted page is forbidden');
        console.log('----------------------------------------------');
        done();
      });
  });
});
