'use strict';
const Service = require('egg').Service;
const sha1 = require('sha1');
class UserService extends Service {
  async register() {
    const { ctx } = this;
    const { username, password, repeatPwd } = ctx.request.body;
    try {
      if (password !== repeatPwd) {
        return {
          code: -1,
          data: '两次密码不一致',
        };
      }
      const isExistUser = await ctx.model.User.findOne({
        where: {
          username,
        },
      });
      if (!isExistUser) {
        const res = await ctx.model.User.create({
          username,
          password: sha1(password),
        });
        return {
          code: 1,
          data: res.dataValues,
        };
      }
      return {
        code: -1,
        data: '用户已存在',
      };
    } catch (err) {
      throw err;
    }
  }
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({
      raw: true,
      where: {
        username,
      },
    });
    if (!user) {
      return {
        code: -1,
        data: '用户不存在',
      };
    }
    // 登录成功
    if (sha1(password) === user.password) {
      const token = await ctx.service.token.genToken(
        { userid: user.userid },
        3600 * 24
      );
      // ctx.session.user
      return {
        code: 1,
        data: user,
        token,
      };
    }
    return {
      code: -1,
      data: '密码不正确',
    };
  }
  // 上传头像
  async uploadAvatar() {
    const { ctx } = this;
    const res = await ctx.service.upload.upload();
    const { url } = res;
    if (res) {
      await ctx.model.User.update(
        {
          avatar: url,
        },
        {
          where: { userid: res.userid },
        }
      );
      return {
        msg: 'success',
        url,
      };
    }
    return {
      msg: 'fail',
    };
  }
}
module.exports = UserService;
