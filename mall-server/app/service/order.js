const { Service } = require("egg");
const tools = require("../util/tools");
class OrderService extends Service {
  async getOrder() {
    const { ctx } = this;
    const { userid } = ctx.request.query;
    const orderIds = await ctx.model.Order.findAll({ userid });
    // console.log("orderIds",orderIds)
    let goodList = [];
    orderIds.forEach(async item => {
      //每一个订单号对应的所有商品
      let _order_goodList = await ctx.model.OrderItem.findAll({
        orderid: item.dataValues.orderid
      });
      // console.log("_order_goodList",_order_goodList)

      _order_goodList.forEach(async good => {
        let ossGood = await ctx.model.Good.findOne({
          goodId: good.dataValues.goodId
        });

        ossGood = Object.assign(ossGood.dataValues, good.dataValues);
        console.log("ossGood",ossGood.valueOf())
        goodList.push(ossGood);
      });
    });
    console.log("goodList", goodList);

    return goodList;
  }
  async addOrder() {
    const { ctx } = this;
    let { userid, goodList } = ctx.request.body;
    const orderId = tools.getTradeNo();
    await ctx.model.Order.create({
      userid,
      orderId
    });
    goodList.forEach(async item => {
      await ctx.model.OrderItem.create({
        orderId,
        ...item
      });
    });
  }
}
module.exports = OrderService;
/**
 * userid:'',
 * orderId:'',
 * goodList:[
 *   {
 *     goodId:'',
 *     price:'',
 *     number:''
 *   }
 * ]
 *
 *
 *
 *
 *
 */
