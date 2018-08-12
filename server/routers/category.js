const router = require('koa-router')();
const model = require('../mysql/mysql')
// const checkToken = require('../tools/checkToken')
const { success, fail, tokenInvalid } = require('../config/config').codeOption
router.prefix('/api/category')
router.get('/getCates', async (ctx) => {
    await model.getCates().then(res => {
        ctx.body = {
            code: success,
            data: res
        }
    }).catch(err => {
        ctx.body = {
            code: fail,
            msg: 'err'
        }
    })
})
module.exports=router
