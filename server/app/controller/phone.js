"use strict";
const BaseController = require("./BaseController");

class PhoneController extends BaseController {
 /**
  * 绑定手机
  */
  async bindPhone(){
    const res = await this.service.phone.bindPhone();
    this.ctx.body = res;
  }
  /**
   * 发送短信验证码
   */
  async sendSms(){
    const {ctx}=this
    let {phone}=ctx.request.query
    phone=phone.replace(/\s/g,'')
    await ctx.service.phone.sendSms(phone)
    ctx.body=''
  }
}
module.exports=PhoneController
