const router = require('koa-router')();
const model = require('../mysql/mysql')
const tools = require('../tools/tools')
router.prefix('/api/order')
router.get('/getOrders', async (ctx) => {
    const { userid } = ctx.request.query
    //先通过userid查找该用户的订单id和状态等信息
    let orders = await model.getOrders(userid)
    //通过订单id关联order_item表
    let orderItemInfo = await model.getOrderItem(orders[0].orderId)
    //通过商品id去商品表查询商品信息 合并到订单数据
    let assGood = (orderItemInfo) => {
        const promiseArray = orderItemInfo.map(async item => {
            //查询到的商品信息
            let good = (await model.getGoodById(item.goodId))[0]
            //合并商品信息到对应的订单
            item = Object.assign(item, good)
            return item
        })
        //Promise.all等待所有的订单都合并完
        return Promise.all(promiseArray)
    }
    let res = await assGood(orderItemInfo)
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
