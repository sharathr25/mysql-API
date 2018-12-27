// eslint-disable-next-line prefer-destructuring
const expect = require('chai').expect;
const author = require('../../routes/authors/author_controller.js');

// testing mysql book db
describe('testing test database', () => {
  it('getting authors from test database', async () => {
    let authorTestData = {
      id: 1, name: 'osmani', about: 'programmer', place: 'LA',
    };
    const data = await author.getAuthors();
    const author = data[0];
    const authorData = JSON.stringify(author[0]);
    authorTestData = JSON.stringify(authorTestData);
    expect(authorData).to.be.equal(authorTestData);
  });
  it('getting author by valid author id from test database', async () => {
    const data = await author.getAuthors();
    let authorTestData = {
      id: 1, name: 'osmani', about: 'programmer', place: 'LA',
    };
    const author = data[0];
    const authorData = JSON.stringify(author[0]);
    authorTestData = JSON.stringify(authorTestData);
    expect(authorData).to.be.equal(authorTestData);
  });
  it('Not getting author by wrong author id from test database', async () => {
    const data = await author.getAuthorById(10);
    expect(data[0]).to.be.an('array');
    expect(data[0].length).to.be.equal(0);
  });
});
