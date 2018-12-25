const request = require('supertest');
// const mocha = require('mocha');
// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;
const getBookByIsbn = require('../config/getBookDetails.js');
const getAuthorById = require('../config/getAuthorDetails.js');
const getBookDbData = require('../routes/books/book_controller.js');
const getAuthorDbData = require('../routes/authors/author_controller.js');
const getUserMdbData = require('../routes/users/user_controller.js');

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

// testing routes
describe('loading express', () => {
  process.env.test = true;
  let server;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../server.js');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to / -status 200', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('responds to /login', (done) => {
    request(server)
      .get('/login')
      .expect(200, done);
  });
  it('responds to /register', (done) => {
    request(server)
      .get('/register')
      .expect(200, done);
  });
  it('responds to /addUser', (done) => {
    request(server)
      .post('/addUser')
      .send('username=abcd')
      .send('email=abcd@gmail.com')
      .send('password=1234')
      .send('password1=1234')
      .expect(200, done);
  });
  it('responds to /checkuser', (done) => {
    request(server)
      .post('/checkuser')
      .send('email=abcd@gmail.com')
      .send('password=1234')
      .expect(200, done);
  });
  it('responds to /logout', (done) => {
    request(server)
      .get('/logout')
      .expect(200, done);
  });
  it('responds to /books -status 200', (done) => {
    request(server)
      .get('/books')
      .expect(200, done);
  });
  it('responds to /authors -status 200', (done) => {
    request(server)
      .get('/authors')
      .expect(200, done);
  });
  it('responds to /bookisbn/valid isbn -status 200', (done) => {
    request(server)
      .get('/bookisbn/123')
      .expect(200, done);
  });
  it('responds to /bookisbn/invalid isbn -status 500', (done) => {
    request(server)
      .get('/bookisbn/-1')
      .expect(500, done);
  });
  it('responds to /author/valid author id -status 200', (done) => {
    request(server)
      .get('/author/1')
      .expect(200, done);
  });
  it('responds to /author/invalid author id -status 500', (done) => {
    request(server)
      .get('/author/-1')
      .expect(500, done);
  });
  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

// testing JSON
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

// testing mysql author db
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

// testing mysql book db
describe('testing test database', () => {
  process.env.test = true;
  it('getting books from test database', async () => {
    const data = await getBookDbData.getBooks();
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.above(0);
  });
  it('getting book by isbn from test database', async () => {
    const data = await getBookDbData.getBookByIsbn(123);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(1);
  });
  it('Not getting book by wrong isbn from test database', async () => {
    const data = await getBookDbData.getBookByIsbn(123333);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(0);
  });
  it('getting authors from test database', async () => {
    const data = await getAuthorDbData.getAuthors();
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.above(0);
  });
  it('getting book by author id from test database', async () => {
    const data = await getAuthorDbData.getAuthorById(1);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.above(0);
  });
  it('Not getting auhtor by wrong author id from test database', async () => {
    const data = await getAuthorDbData.getAuthorById(10);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(0);
  });
  it('getting book by author id from database', async () => {
    const data = await getBookDbData.getBookById(1, true);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.above(0);
  });
  it('Not getting book by wrong author id from database', async () => {
    const data = await getBookDbData.getBookById(10);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(0);
  });
});

// testing users mongo db
describe('testing mongodb', () => {
  process.env.test = true;
  const userFormData = {
    username: 'abcd',
    email: 'abcd@gmail.com',
    password: '1234',
  };
  it('finding an user with valid email', async () => {
    const data = await getUserMdbData.findUser('abcd@gmail.com');
    expect(data).to.be.an('array');
    expect(data.length).to.be.above(0);
  });
  it('saving user data', async () => {
    const data = await getUserMdbData.addUser(userFormData);
    expect(data).to.be.an('object');
    expect(data.username).to.be.equal('abcd');
  });
  it('Not finding an user with invalid email', async () => {
    const data = await getUserMdbData.findUser('abc@gmail.com');
    expect(data).to.be.an('array');
    expect(data.length).to.be.equal(0);
  });
});
