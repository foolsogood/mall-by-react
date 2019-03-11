'use strict';
module.exports = () => {
  return async function userInterceptor(ctx, next) {
    const token = ctx.request.headers.authorization;
    // console.log('token',token);
    // 判空
    if (token) {
      const result = await ctx.service.token.verifyToken(token);
      const { userid } = result;
      if (userid) {
        const redis_token = await ctx.service.token.getToken(userid);
        if (token === redis_token) {
          await next();
        } else {
          ctx.status = 403;
          // token失效
          return (ctx.body = {
            code: -2,
            message: '请登录,token失效',
          });
        }
      } else {
        ctx.status = 403;
        return (ctx.body = {
          code: -2,
          ...result,
        });
      }
    } else {
      ctx.status = 401;
      // 前端参数无token
      return (ctx.body = {
        code: -2,
        message: '请登录获取token',
      });
    }
  };
};
