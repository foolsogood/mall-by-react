"use strict";
const BaseController = require("./BaseController");
class GoodController extends BaseController {
  async getHotGoods() {
    try {
      const res = await this.ctx.service.good.getHotGoods();
      this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
  async getNewGoods() {
    try {
      const res = await this.ctx.service.good.getNewGoods();
      this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
  async getGoodDetail() {
    try {
      const goodDetail = await this.ctx.service.good.getGoodDetail();
      const goodComment = await this.ctx.service.good.getGoodComment();
      this.success({ ...goodDetail.dataValues, comments: goodComment });
    } catch (err) {
      this.fail(err);
    }
  }
  async searchGood() {
    try {
      const res = await this.ctx.service.good.searchGood();
      this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }

  async getGoodByCateId() {
    try {
      const res = await this.ctx.service.good.getGoodByCateId();
      this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
}
module.exports = GoodController;
