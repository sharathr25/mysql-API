const dev = {
  host: '10.10.4.173',
  user: 'sharath',
  password: 'drowssap',
  database: 'webbook',
};

const production = {
  host: 'books.ccmvwadqp8x8.ap-south-1.rds.amazonaws.com',
  user: 'root',
  password: 'drowssap',
  database: 'webbook',
  port: 3306,
};

module.exports = {
  devUrl: dev,
  productionUrl: production,
};
