const mysql = require('mysql2/promise');
const ownerdata = require('../data/owner_data');

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: ownerdata.host,
    user: ownerdata.user,
    password: ownerdata.password,
  });
  const dataBaseName = 'test';
  const sql = `create database ${dataBaseName}`;
  await connection.query(sql);
  connection.close();
}

createDatabase();
