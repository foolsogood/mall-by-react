'use strict';
const mock = require('../../database/mock');
module.exports = app => {
  const { INTEGER, UUID, STRING, TEXT, BOOLEAN, DATE,JSON } = app.Sequelize;
  const _comment = app.model.define(
    'comment',
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
        allowNull: true,
        comment:'头像'
      },
      imgList: {
        type: JSON,
        allowNull: true,
        comment:'评论图片'
      },
      name: {
        type: STRING(20),
        allowNull: false,
        comment:'评论人姓名'
      },
      rateScore: {
        type: TEXT,
        allowNull: false,
        comment:'评分'
      },
      comment: {
        type: TEXT,
        allowNull: true,
        comment:'评语'
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
