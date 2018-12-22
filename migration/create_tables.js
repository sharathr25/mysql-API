const mysql = require('mysql2/promise');
const ownerdata = require('../data/owner_data');

async function createTables() {
  const connection = await mysql.createConnection(ownerdata);
  let sql = `CREATE TABLE IF NOT EXISTS authors (
    id INT primary key,
    name VARCHAR(20) CHARACTER SET utf8,
    about VARCHAR(37) CHARACTER SET utf8,
    place VARCHAR(22) CHARACTER SET utf8
);`;
  await connection.query(sql);
  sql = `CREATE TABLE IF NOT EXISTS books (
  isbn BIGINT primary key,
  title VARCHAR(100) CHARACTER SET utf8,
  subtitle VARCHAR(200) CHARACTER SET utf8,
  published VARCHAR(50) CHARACTER SET utf8,
  publisher VARCHAR(50) CHARACTER SET utf8,
  pages INT,
  description VARCHAR(1000) CHARACTER SET utf8,
  imgsrc VARCHAR(50) CHARACTER SET utf8,
  author_id int,
  foreign key(author_id) references authors(id)
);`;
  await connection.query(sql);
  connection.close();
  console.log('finished');
}

createTables();
