"use strict";
const Controller = require("egg").Controller;
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 1,
      data
    };
  }
  fail(err) {
    this.ctx.body = {
        code: -1,
        err
      };
      throw err
  }
}
module.exports = BaseController;
