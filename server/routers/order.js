const router = require('koa-router')();
const model = require('../mysql/mysql')
// const checkToken = require('../tools/checkToken')
const tools = require('../tools/tools')
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
router.post('/addOrder', async (ctx) => {
    let { userid, goodId, price, number } = ctx.request.body
    const orderId = tools.guid
    goodId = JSON.parse(goodId)
    price = JSON.parse(price)
    number = JSON.parse(number)
    console.log(userid, goodId, price, number)
    let arr = []
    for (let i = 0; i < goodId.length; i++) {
        model.addOrder([userid, orderId, goodId[i], price[i], number[i]]).then(res=>{

        }).catch(err=>console.error(err))
    }
    ctx.body = {
        code: '1',
        data: 'success'
    }
    // Promise.all(arr).then(res => {
    //     ctx.body = {
    //         code: '1',
    //         data: 'success'
    //     }
    // }).catch(err => {
    //     ctx.body = {
    //         code: '0',
    //         msg: err
    //     }
    // })
})
module.exports = router
