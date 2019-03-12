'use strict';
const { Service } = require('egg');
class HomeService extends Service {
  async getHotGoods() {
    const { ctx } = this;
    const good=await ctx.model.Good.findAll({
      raw: true,
      where: {
        isHot: 1
      }
    });
    good.forEach(item=>{
      item.detailImg=JSON.parse(item.detailImg)
      item.imgs=JSON.parse(item.imgs)
    })
    return good
  }
  async getNewGoods() {
    const { ctx } = this;
    const good=await ctx.model.Good.findAll({
      raw: true,
      where: {
        isNew: 1
      }
    });
    good.forEach(item=>{
      item.detailImg=JSON.parse(item.detailImg)
      item.imgs=JSON.parse(item.imgs)
    })
    return good
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
    good.detailImg=JSON.parse(good.detailImg)
    good.imgs=JSON.parse(good.imgs)

    let result = await ctx.service.token.verifyToken(token);
    if (result) {
      let { userid } = result;
      let res = await ctx.model.Collect.findOne({
        raw: true,
        where: { userid, goodId }
      });
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
    const { isCollect, token } = ctx.request.body;
    const data = await ctx.service.token.verifyToken(token);
    const { userid } = data;
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
  async getCollectGood() {
    const { ctx } = this;
    const { token } = ctx.query;
    const data = await ctx.service.token.verifyToken(token);
    const { userid } = data;
    let arr = await ctx.model.Collect.findAll({
      raw: true,
      where: { userid }
    });
    arr = arr.filter(item => item.isCollect);
    const assGood = async arr => {
      let result = [];
      for (let item of arr) {
        const good = await ctx.model.Good.findOne({
          raw: true,
          where: { goodId: item.goodId }
        });
        item = Object.assign({}, good, item);
        result.push(item);
      }
      return result;
    };

    return assGood(arr);
  }
  async getGoodComment(pageSize=5,pageNum=1) {
    const { ctx } = this;
    const { goodId } = ctx.params;
    const res = await ctx.model.Comments.findAll({
      raw: true,
      limit:pageSize,
      offset:(pageNum-1)*pageSize,
      where: {
        goodId,
       
      }
    });
    return res;
  }
  async addGoodComment() {
    const { ctx } = this;
    const { goodId } = ctx.params;
    const data=await ctx.service.upload.upload()
    const { isAnonymous, urlList, comment, rate,userid } = data ;
    let res
    if (isAnonymous-0) {
    res=  await ctx.model.Comments.create({
        goodId,
        comment,
        name: '火星用户',
        imgList:JSON.stringify(urlList),
        rateScore: rate
      });
    } else {
      const { userid } = data;
      const userInfo = await ctx.model.User.findOne({
        raw: true,
        where: { userid }
      });
     res= await ctx.model.Comments.create({
        goodId,
        comment,
        imgList:JSON.stringify(urlList),
        rateScore: rate,
        name: userInfo.username,
        avatar: userInfo.avatar
      });
    }
    return res;
  }
  async getGoodByCateId() {
    const { ctx } = this;
    const { cateId } = ctx.params;
    const good=await ctx.model.Good.findAll({
      raw:true,
      where: {
        cateId: cateId
      }
    });
    good.forEach(item=>{
      item.detailImg=JSON.parse(item.detailImg)
      item.imgs=JSON.parse(item.imgs)
    })
    return good
  }
  async searchGood() {
    const { ctx } = this;
    const { keyword } = ctx.query;
    const good=await ctx.model.Good.findAll({
      raw:true,
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
    good.forEach(item=>{
      item.detailImg=JSON.parse(item.detailImg)
      item.imgs=JSON.parse(item.imgs)
    })
    return good
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
