"use strict";
const Controller = require("egg").Controller;
class UserController extends Controller {
  async register() {
    const user = {
        username: "jack",
        password: "123"
    }
    // console.log(this.service.user)
    const res = await this.service.user.register(user);
    this.ctx.body = res;
  }
}
module.exports=UserController
