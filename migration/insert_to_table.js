const mysql = require('mysql');
const booksjson = require('../data/books.json');
const authorjson = require('../data/authors.json');
const ownerdata = require('../data/owner_data');

const con = mysql.createConnection(ownerdata);

con.connect((err) => {
  if (err) throw err;
  for (let i = 0; i < authorjson.authors.length; i += 1) {
    const data = authorjson.authors[i];
    const sql = `insert into authors 
values(${data.id},'${data.name}','${data.about}','${data.place}')`;
    console.log(sql);
    con.query(sql, (er) => {
      if (er) throw er;
      console.log('inserted to authors table');
    });
  }
  for (let i = 0; i < booksjson.books.length; i += 1) {
    const data = booksjson.books[i];
    const sql = `insert into books 
values(${data.isbn},'${data.title}','${data.subtitle}','${data.author}','${data.published}','${data.publisher}',${data.pages},'${data.description}','${data.website}','${data.imgsrc}',${i + 1})`;
    console.log(sql);
    con.query(sql, (er) => {
      if (er) throw er;
      console.log('inserted to books table');
    });
  }
  con.end();
});
