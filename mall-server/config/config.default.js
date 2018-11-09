'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = [];

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    hostname: '127.0.0.1',
    port: 3306,
    password:'FSG851024125',
    database: 'mall-server',
    username:'root'
  };

  return config;
};
