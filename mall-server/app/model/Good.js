"use strict";
const mock = require("../../database/mock");
module.exports = app => {
  const { INTEGER, STRING, UUID, UUIDV4, TEXT, BOOLEAN } = app.Sequelize;
  const _good = app.model.define(
    "good",
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      cateId: {
        type: UUID,
        allowNull: false
      },
      cate: {
        type: STRING(20),
        allowNull: false
      },
      goodId: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false
      },
      goodName: {
        type: STRING(50),
        allowNull: false
      },
      imgs: {
        type: STRING(500),
        allowNull: false
      },
      desction: {
        type: TEXT,
        allowNull: true
      },
      price: {
        type: TEXT,
        allowNull: false
      },
      isHot: {
        type: BOOLEAN,
        defaultValue:false,
        allowNull: true
      },
      isNew: {
        type: BOOLEAN,
        defaultValue:false,
        allowNull: true
      },
      detailImg: {
        type: STRING(500),
        allowNull: false
      },
    },
    {
      freezeTableName: true
    }
  );
  //初始化时候插入mock数据
  mock.goods.forEach(item => {
    _good.sync({ force: true }).then(() => {
        return _good.create({
            ...item,
            imgs:JSON.stringify(item.imgs),
            detailImg:JSON.stringify(item.detailImg),
        })
    });
  });
  return _good;
};
