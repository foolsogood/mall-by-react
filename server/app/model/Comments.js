"use strict";
const mock = require("../../database/mock");
module.exports = app => {
  const { INTEGER, UUID, STRING, TEXT, BOOLEAN, DATE } = app.Sequelize;
  const _comment = app.model.define(
    "comment",
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      goodId: {
        type: UUID,
        allowNull: false
      },
      avatar: {
        type: STRING(500),
        allowNull: true
      },
      imgList: {
        type: STRING,
        allowNull: true
      },
      name: {
        type: STRING(20),
        allowNull: false
      },
      rateScore: {
        type: STRING,
        allowNull: false
      },
      comment: {
        type: TEXT,
        allowNull: true
      }
    },
    {
      freezeTableName: true
    }
  );
  //初始化时候插入mock数据
  mock.comments.forEach(item => {
    _comment.sync({ force: true }).then(() => {
      return _comment.create(item);
    });
  });
  return _comment;
};
