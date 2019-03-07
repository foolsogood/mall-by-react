'use strict';
module.exports = app => {
  const { INTEGER, STRING,  UUID, UUIDV4 } = app.Sequelize;
  const userModel = app.model.define("user", {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING(50),
      allowNull: false,
      comment:'用户名'
    },
    userid: {
      type: UUID,
      defaultValue:UUIDV4,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    },
    avatar: {
      type: STRING(100),
      allowNull: true,
      comment:'头像'
    },
    phone: {
      type: STRING(20),
      allowNull: true,
      comment:'手机'
    }
  },{
    freezeTableName:true
  });
  return userModel
};
