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
      allowNull: false
    },
    goodId: {
      type: UUID,
      allowNull: false
    },
    isCollect: {
      type: BOOLEAN,
      allowNull: false
    },
  },{
    freezeTableName:true
  });
 
};
