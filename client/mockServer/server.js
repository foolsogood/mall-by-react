const Koa = require('koa');
const Router = require('koa-router');
const qs = require('qs');
const cors = require('koa-cors');
const app = new Koa();
const router = new Router();
//mock数据
const mockData = require('./mock/index').mockData;
/**
 * 获取首页banner图
 */
router.get('/api/homeImgList', (ctx, next) => {
    let res = {
        code: 1,
        data: {} 
    }
    res.data = mockData.homeImgList
    ctx.body = res
})
/**
 * 获取推荐商品
 */
router.get('/api/getRecomendGoods', (ctx, next) => {
    let res = {
        code: 1,
        data: {}
    }
    res.data = mockData.recomendGoods
    ctx.body = res
})
/**
 * 获取热门商品
 */
router.get('/api/getHotGoods', (ctx, next) => {
    let res = {
        code: 1,
        data: {}
    }
    res.data = mockData.hotGoods
    ctx.body = res
})
/**
 * 获取商品列表
 * @params{request} cateId 分类id
 * @params{request} goodId 商品id
 */
router.get('/api/getGoodList', (ctx, next) => {
    const params = qs.parse(ctx.req._parsedUrl.query);
    const cateId = params.cateId
    const goodId = params.goodId
    /**
     * 返回商品列表
     */
    let res = {
        code: 1,
        data: {}
    }
    res.data = mockData.goodList
    /**
     * 如果传了cateId goodId参数，data 返回商品详情
     */
    if (cateId && goodId) {
        res.data = mockData.goodList[cateId].list[goodId]
    }
    ctx.body = res
})
app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3001);
console.log('服务器运行在 http://localhost:3001')