const authorjson = require('./data/authors.json');

const getAuthorDetails = (authorName) => {
  let index = -1;
  for (let i = 0; i < authorjson.authors.length; i += 1) {
    if (authorName === authorjson.authors[i].name) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    return 'not found';
  }
  return authorjson.authors[index];
};

module.exports = getAuthorDetails;
