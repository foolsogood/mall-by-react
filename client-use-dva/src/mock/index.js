const banner = require("./banner");
const category = require("./category");
const good = require("./good");
const comments = require("./comments");
const api = require("../service/api.js");
const getParam=(url)=>{
    const lastIdx=url.lastIndexOf('/')
    return url.slice(lastIdx+1)
}
const getGoodById=url=>{
    const id=getParam(url)
    const target_good=good.find(item=>item.goodId===id)
    const target_comment=comments.filter(item=>item.goodId===id)
    target_good.comments=target_comment
    return target_good
}
const getGoodComment=url=>{
    const id=getParam(url)
    const target_comment=comments.filter(item=>item.goodId===id)
    return target_comment
}
const getGoodsByCate=url=>{
    const id=getParam(url)
    const target_goods=good.filter(item=>item.cateId===id)
    return target_goods
}

export const mockApi={
    [api.banner.getHomeBanner]:banner,
    [api.category.getCates]:category,
    [api.good.getHotGoods]:good.filter(item=>item.isHot),
    [api.good.getNewGoods]:good.filter(item=>item.isNew),
    [api.good.getGoodById]:getGoodById,
    [api.good.getGoodComment]:getGoodComment,
    [api.good.getGoodsByCate]:getGoodsByCate,



}
export default mockApi


