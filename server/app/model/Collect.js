'use strict';
module.exports = app => {
  const { INTEGER,  UUID, UUIDV4,BOOLEAN } = app.Sequelize;
  return  app.model.define("collect", {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
   
    userid: {
      type: UUID,
      defaultValue:UUIDV4,
      allowNull: false,
      comment:'用户id'
    },
    goodId: {
      type: UUID,
      allowNull: false,
      comment:'商品id'
    },
    isCollect: {
      type: BOOLEAN,
      allowNull: false,
      comment:'收藏商品标识'
    },
  },{
    freezeTableName:true
  });
 
};
