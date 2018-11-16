const { Service } = require("egg");
const tools = require("../util/tools");
class OrderService extends Service {
  async getOrder() {
    const { ctx } = this;
    const { userid } = ctx.request.query;
    //该用户所有订单 TODO：分页处理 @fsg 2018.11.16
    const allOrders = await ctx.model.Order.findAll({
      raw: true,
      where: { userid }
    });
    const getList = () => {
      let arr = allOrders.map(order => {
        //每个订单里面的所有商品的列表
        let _order_goodList = ctx.model.OrderItem.findAll({
          raw: true,
          where: { orderId: order.orderId }
        });
        return _order_goodList;
      });
      return Promise.all(arr);
    };
    let _p = getList()
      .then(goods => {
        let resArr = [];
        goods.forEach(goodList => {
          goodList.forEach(good => {
            let targetGood = ctx.model.Good.findOne({
              raw: true,
              where: { goodId: good.goodId }
            });
            console.log("good", good);
            resArr.push(targetGood);
          });
        });
        return Promise.all(resArr);
      })
      .then(res => {
        return res;
      });

    return _p;
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
