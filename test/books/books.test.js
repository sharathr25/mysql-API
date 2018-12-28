// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;
const book = require('../../src/books/book_controller.js');
const review = require('../../src/books/get_book_review');

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
    const bookDbData = data[0];
    expect(bookDbData).to.be.an('array');
    expect(bookDbData.length).to.be.equal(0);
  });
  it('getting book review', async () => {
    const bookReview = await review.getReview(123);
    const rating = bookReview[0];
    const totalRatings = bookReview[1];
    expect(rating).to.be.equal('3.68');
    expect(totalRatings).to.be.equal('19');
  });
});
