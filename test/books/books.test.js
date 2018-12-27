// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;
const book = require('../../routes/books/book_controller.js');

// testing mysql book db
describe('testing test database', () => {
  it('getting books from test database', async () => {
    let bookTestData = {
      isbn: 123,
      title: 'abcd',
      subtitle: 'xyz',
      published: 'o reilly',
      publisher: '2018',
      pages: 200,
      description: 'no desccription',
      imgsrc: 'no image',
      author_id: 1,
      name: 'osmani',
    };
    const data = await book.getBooks();
    const books = data[0];
    const bookData = JSON.stringify(books[0]);
    bookTestData = JSON.stringify(bookTestData);
    expect(bookData).to.be.equal(bookTestData);
  });
  it('getting book by isbn from test database', async () => {
    const data = await book.getBooks(123);
    let bookTestData = {
      isbn: 123,
      title: 'abcd',
      subtitle: 'xyz',
      published: 'o reilly',
      publisher: '2018',
      pages: 200,
      description: 'no desccription',
      imgsrc: 'no image',
      author_id: 1,
      name: 'osmani',
    };
    bookTestData = JSON.stringify(bookTestData);
    const books = data[0];
    const bookData = JSON.stringify(books[0]);
    expect(bookData).to.be.equal(bookTestData);
  });
  it('Not getting book by wrong isbn from test database', async () => {
    const data = await book.getBookByIsbn(123333);
    const book = data[0];
    expect(book).to.be.an('array');
    expect(book.length).to.be.equal(0);
  });
});
