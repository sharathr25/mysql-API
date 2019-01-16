const request = require('supertest');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;

describe('loading express', () => {
  process.env.DATABASE = 'test';
  process.env.PORT = 7000;
  let server;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../server.js');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /authors  ', (done) => {
    request(server)
      .get('/api/authors')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('"id":1,"name":"osmani","about":"programmer","place":"LA"');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /authors/valid author id  ', (done) => {
    request(server)
      .get('/api/authors/1')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('"id":1,"name":"osmani","about":"programmer","place":"LA"');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /author/invalid author id', (done) => {
    request(server)
      .get('/api/authors/100')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('AUTHOR NOT FOUND');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /author/invalid author id', (done) => {
    request(server)
      .get('/api/authors/abc')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('AUTHOR NOT FOUND');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to POST /api/books -status 500', (done) => {
    request(server)
      .post('/api/authors')
      .send(
        {
          id: '11',
          name: 'kumar',
          place: 'mysore',
          about: 'nothing',
        },
      )
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('author inserted');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /authors/invalid isbn -status 500', (done) => {
    request(server)
      .put('/api/authors/11')
      .send(
        {
          id: '',
          name: 'kumar',
          place: '',
          about: '',
        },
      )
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('author updated');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /authors/invalid isbn -status 500', (done) => {
    request(server)
      .delete('/api/authors/11')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('author deleted');
        console.log('----------------------------------------------');
        done();
      });
  });
});
