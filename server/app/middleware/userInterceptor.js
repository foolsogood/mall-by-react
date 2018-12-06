const jwt = require("jsonwebtoken");
module.exports = (options, app) => {
  return async function userInterceptor(ctx, next) {
    const op = {
      GET: "query",
      POST: "body",
      PUT: "body"
    };
    let { token } = ctx.request[op[ctx.method]];
    //判空
    if (token) {
      let result = await ctx.service.token.verifyToken(token);
      let { userid } = result;
      if (userid) {
        let redis_token = await ctx.service.token.getToken(userid);
        if (token === redis_token) {
          await next();
        } else {
          ctx.status = 403;
          //token失效
          return (ctx.body = {
            code: -2,
            message: "请登录,token失效"
          });
        }
      } else {
        ctx.status = 403;
        return (ctx.body = {
          code: -2,
          ...result
        });
      }
    } else {
      ctx.status = 401;
      //前端参数无token
      return (ctx.body = {
        code: -2,
        message: "请登录获取token"
      });
    }
  };
};
