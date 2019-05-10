'use strict';
const { Service } = require('egg');
class CategoryService extends Service {
  async getAllCategory() {
    const { ctx } = this;
    return ctx.model.Category.findAll();
  }
}
module.exports = CategoryService;
