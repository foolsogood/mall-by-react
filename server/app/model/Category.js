'use strict';
const mock = require('../../database/mock');
module.exports = app => {
  const { INTEGER, STRING,  UUID, UUIDV4 } = app.Sequelize;
  const _category=  app.model.define('category', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cateId: {
      type: UUID,
      defaultValue:UUIDV4,
      allowNull: false
    },
    cate: {
      type: STRING(100),
      allowNull: false
    },
  },{
    freezeTableName:true
  });
   //初始化时候插入mock数据
   mock.category.forEach(item => {
    _category.sync({ force: true }).then(() => _category.create(item));
  });
  return _category
};
