const authorjson = require('./data/authors.json');

const getAuthorDetails = (authorName) => {
  let index;
  for (let i = 0; i < authorjson.authors.length; i += 1) {
    if (authorName === authorjson.authors[i].name) {
      index = i;
      break;
    }
  }
  return authorjson.authors[index];
};

module.exports = getAuthorDetails;
