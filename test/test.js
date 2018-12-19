const request = require('supertest');
const mocha = require('mocha');

mocha.describe('loading express', () => {
  let server;
  mocha.beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../server.js');
  });
  mocha.afterEach(() => {
    server.close();
  });
  mocha.it('responds to / -status 200', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
  mocha.it('responds to /books.ejs -status 200', (done) => {
    request(server)
      .get('/books.ejs')
      .expect(200, done);
  });
  mocha.it('responds to /authors.ejs -status 200', (done) => {
    request(server)
      .get('/authors.ejs')
      .expect(200, done);
  });
  mocha.it('responds to /bookisbn/valid isbn -status 200', (done) => {
    request(server)
      .get('/bookisbn/9781593275846')
      .expect(200, done);
  });
  mocha.it('responds to /bookisbn/invalid isbn -status 500', (done) => {
    request(server)
      .get('/bookisbn/978156')
      .expect(500, done);
  });
  mocha.it('responds to /author/valid author id -status 200', (done) => {
    request(server)
      .get('/author/1')
      .expect(200, done);
  });
  mocha.it('responds to /author/invalid author id -status 500', (done) => {
    request(server)
      .get('/author/-1')
      .expect(500, done);
  });
  mocha.it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
