module.exports = {
  apps: [{
    name: 'mysql-API',
    script: 'server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      user: 'ec2-user',
      key: 'drowssap.pem',
      host: '52.66.237.135',
      ref: 'origin/master',
      repo: 'git@gitlab.com:mountblue/dec-2018-js-backend/08-sharath-mysql-api.git',
      path: '/home/ec2-user/mysql-API',
      'post-setup': 'npm install && npm start',
    },
  },
};
