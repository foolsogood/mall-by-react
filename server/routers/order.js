const router = require('koa-router')();
const model = require('../mysql/mysql')
// const checkToken = require('../tools/checkToken')

router.prefix('/api/order')
router.get('/getOrders', async (ctx) => {
    const { userid } = ctx.body.query
    await model.getOrders(userid).then(res => {
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
router.put('/addOrder', async (ctx) => {
    const { userid, cateId, goodId, goodName, imgs, price, isHot, isNew } = ctx.body.query
    await model.addOrder([userid, cateId, goodId, goodName, imgs, price, isHot, isNew]).then(res => {
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
module.exports = router
