'use strict';
const BaseController = require('./BaseController');
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
  async collectGood() {
    try {
      const res = await this.ctx.service.good.collectGood();
      this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
  async getCollectGood() {
    try {
      const res = await this.ctx.service.good.getCollectGood();
      this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
  async getGoodDetail() {
    try {
      const goodDetail = await this.ctx.service.good.getGoodDetail();
      const goodComment = await this.ctx.service.good.getGoodComment(3,1);
      this.success({ ...goodDetail, comments: goodComment });
    } catch (err) {
      this.fail(err);
    }
  }
  async getGoodComment() {
    const { ctx } = this;
    const { pageSize, pageNum } = ctx.request.query;

    try {
      const res = await ctx.service.good.getGoodComment(Number(pageSize), Number(pageNum));
      this.success(res);
    } catch (err) {
      this.fail(err);
    }
  }
  async addGoodComment() {
    const { ctx } = this;
    try {
      const res = await ctx.service.good.addGoodComment();
      this.success(res);
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
