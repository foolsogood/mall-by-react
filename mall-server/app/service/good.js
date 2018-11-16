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
    const { token } = ctx.query;
    let good = await ctx.model.Good.findOne({
      raw: true,
      where: {
        goodId: goodId
      }
    });
    let result = await ctx.service.token.verifyToken(token);
    if (result) {
      let { userid } = result;
      let res = await ctx.model.Collect.findOne({
        raw: true,
        where: { userid, goodId }
      });
      console.log("res", res);
      if (res) {
        let { isCollect } = res;
        return Promise.resolve(Object.assign(good, { isCollect }));
      } else {
        return Promise.resolve(good);
      }
    } else {
      return Promise.resolve(good);
    }
  }
  async collectGood() {
    const { ctx } = this;
    const { goodId } = ctx.params;
    const { isCollect, userid } = ctx.request.body;
    let flag = await ctx.model.Collect.findOne({
      where: {
        goodId,
        userid
      }
    });
    if (flag) {
      return ctx.model.Collect.update(
        {
          isCollect
        },
        {
          where: { goodId, userid }
        }
      );
    } else {
      return ctx.model.Collect.create({
        goodId,
        userid,
        isCollect
      });
    }
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
