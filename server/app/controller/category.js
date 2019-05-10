'use strict';
const BaseController = require('./BaseController');
class CateController extends BaseController {
  async getAllCategory() {
    try {
      const res = await this.ctx.service.category.getAllCategory();
      this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
}
module.exports = CateController;
