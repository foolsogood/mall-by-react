"use strict";
module.exports = app => {
  const { INTEGER, STRING, UUID, UUIDV4 } = app.Sequelize;
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
        type: UUID,
        defaultValue:UUIDV4,
        allowNull: false
      },
      userid: {
        type: UUID,
        allowNull: false
      },
     
      status: {
        type: INTEGER,
        allowNull: false
      },
      
    },
    {
      freezeTableName: true
    }
  );
  
};
