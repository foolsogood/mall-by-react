'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';
  config.security = {
    csrf: {
      enable: false,
      // TODO `app.config.security.csrf.ignoreJSON` is not safe now, please disable it. @fsg 2018.11.1
      // ignoreJSON: true,
    },
    domainWhiteList: [],
  };
  // add your config here
  config.middleware = [];
  // 添加cors处理
  config.cors = {
    origin: '*',
    credentials: true,
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'FSG851024125',
      db: 0,
    },
  };
  config.sessionRedis = {
    key: 'EGG_SESSION',
    maxAge: 1000 * 3600 * 24,
    httpOnly: true,
    encrypt: false,
  };
  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    hostname: '127.0.0.1',
    port: 3306,
    password: 'FSG851024125',
    database: 'mall_server_db',
    username: 'root',
  };
  config.multipart = {
    fileSize: '50mb',
    // mode: 'file',
    whitelist: [ '.jpg', '.jpeg', '.png', '.gif', '.bmp' ],
  };
  config.oss = {
    client: {
      // accessKeyId: 'LTAI4FdcQ58tbjcBVNqQNhUW',
      // accessKeySecret: 'qO0rVkQl2m7z84VYt9rFGWxQEiUTpt',
      // bucket: 'mall-upload-server',
      // endpoint: 'oss-cn-shenzhen.aliyuncs.com',
      // timeout: '60s',
      accessKeyId: 'LTAImYw1P9qavGsM',
      accessKeySecret: 'B8ueSfNLB2PRXMJTioUfL3aQ2cwa7Q',
      bucket: 'mall-server-upload',
      endpoint: 'oss-cn-shenzhen.aliyuncs.com',
      timeout: '60s',
    },
  };
  return config;
};
