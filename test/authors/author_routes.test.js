const session = require('supertest-session');
const request = require('supertest');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

describe('loading express', () => {
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
  it('responds to /authors  ', (done) => {
    authenticatedSession.get('/authors')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('AUTHOR NAME');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /author/valid author id  ', (done) => {
    authenticatedSession.get('/author/1')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('NAME');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /author/invalid author id', (done) => {
    authenticatedSession.get('/author/100')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('AUTHOR NOT FOUND');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /authors/ author id without logging in', (done) => {
    request(server)
      .get('/authors')
      .expect(403)
      .end((err, res) => {
        expect(res.text).to.have.string('requseted page is forbidden');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /author/1 author id without logging in', (done) => {
    request(server)
      .get('/author/1')
      .expect(403)
      .end((err, res) => {
        expect(res.text).to.have.string('requseted page is forbidden');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /author/100 author id without logging in', (done) => {
    request(server)
      .get('/author/100')
      .expect(403)
      .end((err, res) => {
        expect(res.text).to.have.string('requseted page is forbidden');
        console.log('----------------------------------------------');
        done();
      });
  });
});
