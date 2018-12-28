/* eslint-disable prefer-destructuring */
const request = require('request-promise');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();
async function sendRequest(isbnNo) {
  const url = `https://www.goodreads.com/book/isbn/${isbnNo}?key=gNgo81UYk3FMNI5xF9qUsw&format=xml`;
  return request(url);
}

async function getBookReview(isbnNo) {
  const data = await sendRequest(isbnNo);
  let rating;
  let totalRatings;
  let widget;
  const review = [];
  parser.parseString(data, (err, result) => {
    widget = result.GoodreadsResponse.book[0].reviews_widget[0];
    rating = result.GoodreadsResponse.book[0].average_rating[0];
    totalRatings = result.GoodreadsResponse.book[0].work[0].ratings_count[0]._;
    review.push(rating);
    review.push(totalRatings);
    review.push(widget);
  });
  return review;
}

module.exports = {
  getReview: getBookReview,
};
