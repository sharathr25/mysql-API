const mysql = require('mysql2/promise');
const config = require('../../config/db_config');

async function execute(sql, parameters) {
  config.db.database = process.env.DATABASE || config.db.database;
  const connection = await mysql.createConnection(config.db);
  let data;
  try {
    if (parameters !== 'undefined') {
      data = await connection.execute(sql, parameters);
    } else {
      data = await connection.query(sql);
    }
  } catch (error) {
    console.log('sql error');
  } finally {
    connection.close();
  }
  return data;
}

module.exports = {
  executeQuery: execute,
};
