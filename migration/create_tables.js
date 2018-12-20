const mysql = require('mysql');
const ownerdata = require('../data/owner_data');

const con = mysql.createConnection(ownerdata);

con.connect((err) => {
  if (err) throw err;
  let sql = `CREATE TABLE IF NOT EXISTS authors (
    id INT primary key,
    name VARCHAR(20) CHARACTER SET utf8,
    about VARCHAR(37) CHARACTER SET utf8,
    place VARCHAR(22) CHARACTER SET utf8
);`;
  con.query(sql, (err1) => {
    if (err1) throw err1;
    console.log('auhtors table created');
  });
  sql = `CREATE TABLE IF NOT EXISTS books (
    isbn BIGINT primary key,
    title VARCHAR(41) CHARACTER SET utf8,
    subtitle VARCHAR(65) CHARACTER SET utf8,
    author VARCHAR(20) CHARACTER SET utf8,
    published VARCHAR(24) CHARACTER SET utf8,
    publisher VARCHAR(15) CHARACTER SET utf8,
    pages INT,
    description VARCHAR(500) CHARACTER SET utf8,
    website VARCHAR(71) CHARACTER SET utf8,
    imgsrc VARCHAR(25) CHARACTER SET utf8,
    id int,
    foreign key(id) references authors(id)
);`;
  con.query(sql, (err1) => {
    if (err1) throw err1;
    console.log('books table created');
  });
  con.end();
});
