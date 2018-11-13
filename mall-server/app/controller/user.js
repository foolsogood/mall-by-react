"use strict";
const BaseController = require("./BaseController");

class UserController extends BaseController {
  async register() {
    const res = await this.service.user.register();
    this.ctx.body = res;
  }
  async login(){
    const res = await this.service.user.login();
    this.ctx.body = res;
  }
}
module.exports=UserController
