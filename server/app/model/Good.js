'use strict';
const mock = require('../../database/mock');
module.exports = app => {
  const { INTEGER, STRING, UUID, UUIDV4, TEXT, BOOLEAN } = app.Sequelize;
  const _good = app.model.define(
    'good',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      cateId: {
        type: UUID,
        allowNull: false,
        comment:'商品分类id'
      },
      cate: {
        type: STRING(20),
        allowNull: false,
        comment:'商品分类名'
      },
      goodId: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false
      },
      goodName: {
        type: STRING(50),
        allowNull: false,
        comment:'商品名'
      },
      imgs: {
        type: STRING(1000),
        allowNull: false,
        comment:'商品图片 用于banner'
      },
      desction: {
        type: TEXT,
        allowNull: true,
        comment:'描述'
      },
      price: {
        type: TEXT,
        allowNull: false,
        comment:'价格'
      },
      isHot: {
        type: BOOLEAN,
        defaultValue:false,
        allowNull: true,
        comment:'是否热门商品'
      },
      isNew: {
        type: BOOLEAN,
        defaultValue:false,
        allowNull: true,
        comment:'是否新品'
      },
      detailImg: {
        type: STRING(500),
        allowNull: false,
        comment:'商品详情图片'
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
