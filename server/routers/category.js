const router = require('koa-router')();
const model = require('../mysql/mysql')
// const checkToken = require('../tools/checkToken')

router.prefix('/api/category')
router.get('/getCates', async (ctx) => {
    await model.getCates().then(res => {
        ctx.body = {
            code: '1',
            data: res
        }
    }).catch(err => {
        ctx.body = {
            code: '0',
            msg: 'err'
        }
    })
})
module.exports=router
