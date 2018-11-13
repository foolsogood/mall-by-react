'use strict';
module.exports = app => {
    const {controller} =app
    const {home,good,category,user}=controller
    app.router.get('/home/getBanner',home.getHomeBanner)
    app.router.get('/good/getHotGoods',good.getHotGoods)
    app.router.get('/good/getNewGoods',good.getNewGoods)
    app.router.get('/good/getGoodDetail/:goodId',good.getGoodDetail)
    app.router.get('/good/getGoodByCateId',good.getGoodByCateId)
    app.router.get('/good/searchGood',good.searchGood)
    app.router.get('/category/getAllCategory',category.getAllCategory)
    app.router.put('/user/register',user.register)
    app.router.post('/user/login',user.login)




}