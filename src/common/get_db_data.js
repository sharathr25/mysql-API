const mysql = require('mysql2/promise');
const config = require('../../config/db_config');

async function execute(sql, parameters) {
  let url = config.devUrl;
  if (process.env.NODE_ENV === 'production') {
    url = config.productionUrl;
  }
  url.database = process.env.DATABASE || url.database;
  const connection = await mysql.createConnection(url);
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
