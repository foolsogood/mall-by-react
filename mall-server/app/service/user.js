const Service = require("egg").Service;
const sha512 = require("js-sha512");
const sha1 = require("sha1");
class UserService extends Service {
  async register() {
    const { ctx } = this;
    const { username, password, repeatPwd } = ctx.request.body;
    try {
      if (password !== repeatPwd) {
        return {
          code: -1,
          data: "两次密码不一致"
        };
      }
      let isExistUser = await ctx.model.User.findOne({
        where: {
          username
        }
      });
      if(!isExistUser){
        let res = await ctx.model.User.create({
          username,
          password: sha1(password)
        });
        return {
          code: 1,
          data: res.dataValues
        };
      }else{
        return {
          code:-1,
          data:'用户已存在'
        }
      }
    } catch (err) {
      throw err;
    }
  }
  async login(){
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    let isExistUser = await ctx.model.User.findOne({
      where: {
        username
      }
    });
    if(!isExistUser){
      return {
        code:-1,
        data:'用户不存在'
      }
    }else{
      const user=isExistUser.dataValues
      //登录成功
      if(sha1(password)===user.password){
        const token=await ctx.service.token.genToken({userid:user.userid},60)
        // ctx.session.user
        return {
          code:1,
          data:user,
          token
        }
      }else{
        return {
          code:-1,
          data:'密码不正确'
        }
      }
    }
  }
}
module.exports = UserService;
