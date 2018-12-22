const mysql = require('mysql2/promise');
const booksjson = require('../data/books.json');
const authorjson = require('../data/authors.json');
const ownerdata = require('../data/owner_data');

async function executeQuery(sql) {
  const connection = await mysql.createConnection(ownerdata);
  await connection.query(sql);
  connection.close();
}
function insertDataToDatabase() {
  for (let i = 0; i < authorjson.authors.length; i += 1) {
    const data = authorjson.authors[i];
    const sql = `insert into authors values(${data.id},'${data.name}','${data.about}','${data.place}')`;
    executeQuery(sql);
    // console.log(`${i + 1} inserted into authors table`);
  }
  for (let i = 0; i < booksjson.books.length; i += 1) {
    const data = booksjson.books[i];
    const sql = `insert into books values(${data.isbn},'${data.title}','${data.subtitle}','${data.published}','${data.publisher}',${data.pages},'${data.description}','${data.imgsrc}',${data.id})`;
    executeQuery(sql);
    // console.log(`${i + 1} inserted into books table`);
  }
  console.log('done with insertion');
  return 0;
}

insertDataToDatabase();
