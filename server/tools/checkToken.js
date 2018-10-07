const jwt = require('jsonwebtoken');
const { success, fail, tokenInvalid } = require('../config/config').codeOption
const checkToken = (ctx) => {
    //TODO
    // 解构 token，生成一个对象 { name: xx, iat: xx, exp: xx }
    const _con = {
        GET: ctx.request.query,
        POST: ctx.request.body
    }
    const { token } = _con[ctx.request.method]
    const decoded = jwt.decode(token)
    console.log('decoded',decoded)
    // 监测 token 是否过期，decoded.exp为创建时时间 ➕ 增加设置的过期时间
    if (!token || !decoded || (token && decoded && decoded.exp <= new Date() / 1000)) {
        return {
            code: tokenInvalid,
            token: null,
            msg: 'token过期'
        }
    } else{
        return true
    }
    // else {
    //     return Promise.resolve({
    //         code: '1'
    //     })
    // }
    // return true
}

module.exports = checkToken
// function getJWTPayload(token) {
//     // 验证并解析JWT
//     return jwt.verify(token.split(' ')[1], secret);
// }