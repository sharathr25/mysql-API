const request = require('supertest');
const session = require('supertest-session');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

describe('loading express', () => {
  process.env.DATABASE = 'test';
  process.env.PORT = 5000;
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
  it('responds to / -status 200', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('WEBBOOK');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /home -status 200', (done) => {
    authenticatedSession.get('/home')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('Welcome');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /home without logging in', (done) => {
    request(server)
      .get('/home')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('requseted page is forbidden');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('We dont have the page your asking for');
        console.log('----------------------------------------------');
        done();
      });
  });
});
