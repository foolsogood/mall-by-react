"use strict";
module.exports = app => {
  const { INTEGER, STRING, UUID,TEXT,  BIGINT} = app.Sequelize;
  return app.model.define(
    "order_item",
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      orderId: {
        type: BIGINT,
        allowNull: false
      },
      goodId: {
        type: UUID,
        allowNull: false,
        comment:'商品id'
      },
      price: {
        type: TEXT,
        allowNull: false,
        comment:'商品价格'
      },
      number: {
        type: INTEGER,
        allowNull: false,
        comment:'商品数量'
      },
      
    },
    {
      freezeTableName: true
    }
  );
  
};
