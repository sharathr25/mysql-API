const request = require('supertest');
const { expect } = require('chai');

describe('checking book routes', () => {
  let server;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../server.js');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /books -status 200', (done) => {
    request(server)
      .get('/api/books')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('"isbn":123,"title":"abcd"');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /books/valid isbn -status 200', (done) => {
    request(server)
      .get('/api/books/123')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.have.string('"isbn":123,"title":"abcd"');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /books/invalid isbn -status 500', (done) => {
    request(server)
      .get('/api/books/100')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('BOOK NOT FOUND');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /books/invalid isbn -status 500', (done) => {
    request(server)
      .get('/api/books/abc')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('BOOK NOT FOUND');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to POST /api/books -status 500', (done) => {
    request(server)
      .post('/api/books')
      .send(
        {
          isbn: 1234,
          title: 'some',
          subtitle: 'some',
          publishedOn: '2019-01-07',
          publisher: 'some',
          pages: 7,
          description: 'some',
          imgsrc: 'images/9781449328252.jpeg',
          id: 1,
        },
      )
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('book inserted');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /authors/invalid isbn -status 500', (done) => {
    request(server)
      .put('/api/books/1234')
      .send(
        {
          isbn: 1234,
          title: 'something',
          subtitle: 'something',
          publishedOn: '2019-01-07',
          publisher: 'some',
          pages: 7,
          description: 'some',
          imgsrc: 'images/9781449328252.jpeg',
          id: 1,
        },
      )
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('book updated');
        console.log('----------------------------------------------');
        done();
      });
  });
  it('responds to /authors/invalid isbn -status 500', (done) => {
    request(server)
      .delete('/api/books/1234')
      .expect(404)
      .end((err, res) => {
        expect(res.text).to.have.string('book deleted');
        console.log('----------------------------------------------');
        done();
      });
  });
});
