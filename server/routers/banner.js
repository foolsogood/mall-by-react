const router = require('koa-router')();
const model = require('../mysql/mysql')
// const checkToken = require('../tools/checkToken')

router.prefix('/api/banner')
router.get('/getHomeBanner', async (ctx) => {
    await model.getHomeBanner().then(res => {
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