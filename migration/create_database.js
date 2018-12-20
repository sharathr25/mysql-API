const mysql = require('mysql');
const ownerdata = require('../data/owner_data');

const con = mysql.createConnection({
  host: ownerdata.host,
  user: ownerdata.user,
  password: ownerdata.password,
});

con.connect((err) => {
  if (err) throw err;
  const dataBaseName = 'webbook';
  const sql = `create database ${dataBaseName}`;
  console.log(sql);
  con.query(sql, (er) => {
    if (er) throw er;
    console.log(`database ${dataBaseName} is created`);
  });
  con.end();
});
