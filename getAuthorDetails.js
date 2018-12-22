// const authorjson = require('./data/authors.json');

const getAuthorDetails = (id, authorjson) => {
  const author = authorjson.authors.filter(authors => authors.id === id);
  if (author.length === 0) {
    return 'not found';
  }
  return author[0];
};

module.exports = getAuthorDetails;
