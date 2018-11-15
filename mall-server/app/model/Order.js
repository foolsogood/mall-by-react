"use strict";
module.exports = app => {
  const { INTEGER, STRING, UUID, UUIDV4 ,BIGINT} = app.Sequelize;
  return app.model.define(
    "order",
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
      userid: {
        type: UUID,
        allowNull: false
      },
     
      status: {
        type: INTEGER,
        defaultValue:0,
        allowNull: false
      },
      
    },
    {
      freezeTableName: true
    }
  );
  
};
