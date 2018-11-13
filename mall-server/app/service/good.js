const { Service } = require("egg");
class HomeService extends Service {
  async getHotGoods() {
    const { ctx } = this;
    return ctx.model.Good.findAll({
      where: {
        isHot: 1
      }
    });
  }
  async getNewGoods() {
    const { ctx } = this;
    return ctx.model.Good.findAll({
      where: {
        isNew: 1
      }
    });
  }
  async getGoodDetail() {
    const { ctx } = this;
    const { goodId } = ctx.params;
    return ctx.model.Good.findOne({
      where: {
        goodId: goodId
      }
    });
  }
  async getGoodComment() {
    const { ctx } = this;
    const { goodId } = ctx.params;
    return ctx.model.Comments.findAll({
      where: {
        goodId: goodId
      }
    });
  }
  async getGoodByCateId() {
    const { ctx } = this;
    const { cateId } = ctx.query;
    return ctx.model.Good.findAll({
      where: {
        cateId: cateId
      }
    });
  }
  async searchGood() {
    const { ctx } = this;
    const { keyword } = ctx.query;
    return ctx.model.Good.findAll({
      where: {
        $or: {
          cate: {
            $like: `%${keyword}%`
          },
          goodName: {
            $like: `%${keyword}%`
          }
        }
      }
    });
  }
  // async getAllGoods() {
  //   try {
  //     const res = await this.ctx.service.category.getAllCategory();
  //     res.data.map(item => {
  //       item.cateId;
  //     });
  //     this.success();
  //   } catch (err) {
  //     this.fail(err);
  //   }
  // }
}
module.exports = HomeService;
