import { EggAppInfo } from 'midway'

import { DefaultConfig } from './config.modal'


export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583639171353_2548';
  config.security = {
    csrf: {
      enable: false,
      // ignoreJSON: true,
    },
    domainWhiteList: [],
  };
  config.sequelize = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'FSG851024125',
    database: 'mall_db',
    dialect: 'mysql',
}
  // add your config here
  config.middleware = []

  config.welcomeMsg = 'Hello midwayjs!'

  return config
}
