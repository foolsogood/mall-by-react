const router = require('koa-router')();
const model = require('../mysql/mysql')
// const checkToken = require('../tools/checkToken')
const tools = require('../tools/tools')
router.prefix('/api/order')
router.get('/getOrders', async (ctx) => {
    const { userid } = ctx.request.query
    let orders = await model.getOrders(userid)

    let res = await model.getOrderItem(orders[0].orderId)
    res.map(async item => {
       let good= (await model.getGoodById(item.goodId))[0]
       item=Object.assign(item,good)
    })
    console.log(res)
    
    ctx.body = {
        code: '1',
        data: res
    }

})
router.post('/addOrder', async (ctx) => {
    let { userid, goodId, price, number } = ctx.request.body
    const orderId = tools.getOrderId()
    const status = '0'
    let arr = []
    await model.addOrder([userid, orderId, status]).then(res => {
        goodId = JSON.parse(goodId)
        price = JSON.parse(price)
        number = JSON.parse(number)
        for (let i = 0; i < goodId.length; i++) {
            // arr.push(model.addOrderItem([orderId, goodId[i], price[i], number[i]]))
            model.addOrderItem([orderId, goodId[i], price[i], number[i]])

        }
        ctx.body = {
            code: 1,
            data: 'success'
        }
    }).catch(err => console.error(err))
    // Promise.all(arr).then(rep => {
    //     console.log(rep)
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
