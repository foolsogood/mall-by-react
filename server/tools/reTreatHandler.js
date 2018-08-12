const { success, fail, tokenInvalid } = require('../config/config').codeOption
const checkToken = require('../tools/checkToken')

/**
 * 不需要校验token的预处理
 * @param {*} ctx
 * @param {*} next
 */
// async function noTokenNeededpreTreatHandler(ctx, next) {
//   const { code } = ctx.body
//   try {
//     if (code == success) {
//       await next()
//     }
//   } catch (err) {
//     ctx.body = {
//       code: fail,
//       msg: err
//     }
//   }
// }
/**
 * 需要校验token的预处理
 * @param {*} ctx
 * @param {*} next
 */
function tokenNeededpreTreatHandler(ctx, next) {
  return new Promise((resolve, reject) => {
    try {
      let flag = checkToken(ctx)
      if (flag.code === tokenInvalid) {
        // console.log(flag)
        ctx.body = flag
        resolve(ctx.body)
      } else {
        resolve(true)
      }
    } catch (err) {
      reject(err)
    }
  })

}
module.exports = {
  // noTokenNeededpreTreatHandler,
  tokenNeededpreTreatHandler
}
