const jwt = require("jsonwebtoken");
module.exports = (options, app) => {
  return async function userInterceptor(ctx, next) {
    const op = {
      GET: "query",
      POST: "body",
      PUT: "body"
    };
    let { token } = ctx[op[ctx.method]];
    //判空

    if (token) {
      let result = await ctx.service.token.verifyToken(token);
      // console.log("拦截", result);
      // try {
      let { userid } = result;
      if (userid) {
        let redis_token = await ctx.service.token.getToken(userid);
        // console.log('redis_token equal token',token === redis_token)
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
      // } catch (err) {
      //   console.log(0000,err)
      //   ctx.status = 403;
      //   return (ctx.body = result);
      // }
    } else {
      ctx.status = 403;
      //前端参数无token
      return (ctx.body = {
        code: -2,
        message: "请登录获取token"
      });
    }
  };
};
