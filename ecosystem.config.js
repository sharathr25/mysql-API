module.exports = {
  apps: [{
    name: 'mysql-API',
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      user: 'ec2-user',
      key: '/home/sp/Desktop/drowssap.pem',
      host: '52.66.237.135',
      ref: 'origin/master',
      repo: 'git@gitlab.com:mountblue/dec-2018-js-backend/08-sharath-mysql-api.git',
      path: '/home/ec2-user/mysql-API/',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'post-setup': 'pm2 start server.js',
    },
  },
};
