// const request = require('supertest');
// const mocha = require('mocha');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;
const getBookByIsbn = require('../getBookDetails');
const getAuthorById = require('../getAuthorDetails');
const getDbData = require('../get_db_data.js');

// describe('loading express', () => {
//   let server;
//   beforeEach(() => {
//     // eslint-disable-next-line global-require
//     server = require('../server.js');
//   });
//   afterEach(() => {
//     server.close();
//   });
//   it('responds to / -status 200', (done) => {
//     request(server)
//       .get('/')
//       .expect(200, done);
//   });
//   it('responds to /books.ejs -status 200', (done) => {
//     request(server)
//       .get('/books.ejs')
//       .expect(200, done);
//   });
//   mocha.it('responds to /authors.ejs -status 200', (done) => {
//     request(server)
//       .get('/authors.ejs')
//       .expect(200, done);
//   });
//   it('responds to /bookisbn/valid isbn -status 200', (done) => {
//     request(server)
//       .get('/bookisbn/9781593275846')
//       .expect(200, done);
//   });
//   it('responds to /bookisbn/invalid isbn -status 500', (done) => {
//     request(server)
//       .get('/bookisbn/978156')
//       .expect(500, done);
//   });
//   it('responds to /author/valid author id -status 200', (done) => {
//     request(server)
//       .get('/author/1')
//       .expect(200, done);
//   });
//   it('responds to /author/invalid author id -status 500', (done) => {
//     request(server)
//       .get('/author/-1')
//       .expect(500, done);
//   });
//   it('404 everything else', (done) => {
//     request(server)
//       .get('/foo/bar')
//       .expect(404, done);
//   });
// });
const bookjson = {
  books: [
    {
      isbn: '9781593275846',
      title: 'Eloquent JavaScript, Second Edition',
      subtitle: 'A Modern Introduction to Programming',
      author: 'Marijn Haverbeke',
      published: '2014-12-14T00:00:00.000Z',
      publisher: 'No Starch Press',
      pages: 472,
      description: 'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
      website: 'http://eloquentjavascript.net/',
      imgsrc: 'images/9781593275846.jpeg',
    },
    {
      isbn: '9781449331818',
      title: 'Learning JavaScript Design Patterns',
      subtitle: 'A JavaScript and jQuery Developer s Guide',
      author: 'Addy Osmani',
      published: '2012-07-01T00:00:00.000Z',
      publisher: 'O Reilly Media',
      pages: 254,
      description: 'With Learning JavaScript Design Patterns, you will learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.',
      website: 'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/',
      imgsrc: 'images/9781449331818.jpeg',
    },
  ],
};

const authorjson = {
  authors: [
    {
      id: '1',
      name: 'Marijn Haverbeke',
      about: 'Programmer, Tech writer',
      place: 'Berlin',
    },
    {
      id: '2',
      name: 'Addy Osmani',
      about: 'Engineering Manager at google',
      place: 'CA',
    },
  ],
};

describe('testing books', () => {
  it('getting a book not found by invalid isbn', () => {
    const book = getBookByIsbn('9781593275', bookjson);
    expect(book).to.equal('not found');
  });
  it('getting a book object by valid isbn', () => {
    const book = getBookByIsbn('9781593275846', bookjson);
    expect(book).to.be.an('object');
  });
  it('checking book title with valid isbn', () => {
    const book = getBookByIsbn('9781593275846', bookjson);
    expect(book.title).to.be.equal('Eloquent JavaScript, Second Edition');
  });
});

describe('testing authors', () => {
  it('getting a author not found by invalid id', () => {
    const author = getAuthorById('11', authorjson);
    expect(author).to.equal('not found');
  });
  it('getting a author object by valid isbn', () => {
    const author = getAuthorById('1', authorjson);
    expect(author).to.be.an('object');
  });
  it('checking author name with valid id', () => {
    const author = getAuthorById('1', authorjson);
    expect(author.name).to.be.equal('Marijn Haverbeke');
  });
});

describe('testing test database', () => {
  it('getting books from test database', async () => {
    const data = await getDbData.getBooks(true);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.above(0);
  });
  it('getting book by isbn from test database', async () => {
    const data = await getDbData.getBookByIsbn(123, true);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(1);
  });
  it('Not getting book by wrong isbn from test database', async () => {
    const data = await getDbData.getBookByIsbn(123333, true);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(0);
  });
  it('getting authors from test database', async () => {
    const data = await getDbData.getAuthors(true);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.above(0);
  });
  it('getting book by author id from test database', async () => {
    const data = await getDbData.getAuthorById(1, true);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.above(0);
  });
  it('Not getting auhtor by wrong author id from test database', async () => {
    const data = await getDbData.getAuthorById(10, true);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(0);
  });
  it('getting book by author id from database', async () => {
    const data = await getDbData.getBookById(1, true);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.above(0);
  });
  it('Not getting book by wrong author id from database', async () => {
    const data = await getDbData.getBookById(10, true);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(0);
  });
});
