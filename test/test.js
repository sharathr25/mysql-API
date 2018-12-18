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
  mocha.it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
  mocha.it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
