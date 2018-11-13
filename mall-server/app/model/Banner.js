"use strict";
const mock = require("../../database/mock");
module.exports = app => {
  const { INTEGER, STRING, UUID, UUIDV4 } = app.Sequelize;
  const _banner = app.model.define(
    "banner",
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      imgId: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false
      },
      url: {
        type: STRING(100),
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );
  //初始化时候插入mock数据
  mock.banner.forEach(item => {
    _banner.sync({ force: true }).then(() => _banner.create(item));
  });
  return _banner;
};
