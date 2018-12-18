const booksjson = require('./books.json');

console.log(booksjson.books.length);

for (let i = 0; i < booksjson.books.length; i += 1) {
  console.log(booksjson.books[i].title);
  console.log('---------------------');
}
