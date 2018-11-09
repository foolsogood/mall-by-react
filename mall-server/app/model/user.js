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
      allowNull: false
    },
    userid: {
      type: UUID,
      defaultValue:UUIDV4,
      allowNull: false
    },
    password: {
      type: STRING(50),
      allowNull: false
    },
    avatar: {
      type: STRING(100),
      allowNull: true
    },
    phone: {
      type: STRING(20),
      allowNull: true
    }
  });
  return userModel
};
