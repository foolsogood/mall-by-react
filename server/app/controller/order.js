'use strict';
const BaseController = require('./BaseController');

class OrderController extends BaseController {
  async getOrder() {
    try {
      let res = await this.service.order.getOrder();

      this.success(res);
    } catch (err) {
      this.fail({ msg: 'fail' });
    }
  }
  async addOrder() {
    try {
      await this.service.order.addOrder();

      this.success({ msg: 'success' });
    } catch (err) {
      this.fail({ msg: 'fail' });
    }
  }
  async getOrderDetail() {
    try {
     let res= await this.service.order.getOrderDetail();

      this.success(res);
    } catch (err) {
      this.fail({ msg: 'fail' });
    }
  }
}
module.exports = OrderController;
