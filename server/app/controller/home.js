'use strict';
const BaseController = require('./BaseController');
const etag = require('etag');
class HomeController extends BaseController {
  async getHomeBanner() {
    const { ctx } = this;
    try {
      const res = await ctx.service.home.getHomeBanner();
      const ifNoneMatch = ctx.get('if-none-match');
      const _ETAG = etag(JSON.stringify(res));
      ctx.set({
        'Cache-Control': 'max-age=30,no-cache',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        ETag: _ETAG,
      });
      if (ifNoneMatch === _ETAG) {
        ctx.status = 304;
        ctx.body = '';
      } else {
        this.success(res);
      }
    } catch (err) {
      this.fail(err);
    }
  }
}
module.exports = HomeController;
