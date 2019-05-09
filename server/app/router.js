'use strict';
module.exports = app => {
  const { controller } = app;
  const { home, good, category, user, order, phone } = controller;
  // 用户拦截 校验token
  const userInterceptor = app.middleware.userInterceptor({});
  app.router.get('/home/getBanner', home.getHomeBanner);
  app.router.get('/good/getHotGoods', good.getHotGoods);
  app.router.get('/good/getNewGoods', good.getNewGoods);
  app.router.get('/good/getGoodDetail/:goodId', good.getGoodDetail);
  app.router.get('/good/getGoodByCateId/:cateId', good.getGoodByCateId);
  app.router.get('/good/searchGood', good.searchGood);
  app.router.post(
    '/good/collectGood/:goodId',
    userInterceptor,
    good.collectGood
  );
  app.router.get('/category/getAllCategory', category.getAllCategory);
  app.router.put('/user/register', user.register);
  app.router.post('/user/login', user.login);
  app.router.post('/phone/bindPhone', userInterceptor, phone.bindPhone);
  app.router.get('/phone/sendSms', userInterceptor, phone.sendSms);
  app.router.get('/good/getCollectGood', userInterceptor, good.getCollectGood);
  app.router.get('/good/getGoodComment/:goodId', good.getGoodComment);
  app.router.post(
    '/good/addGoodComment/:goodId',
    userInterceptor,
    good.addGoodComment
  );

  app.router.post('/order/addOrder', userInterceptor, order.addOrder);

  app.router.get('/order/getOrder', userInterceptor, order.getOrder);
  app.router.get(
    '/order/getOrderDetail/:orderId',
    userInterceptor,
    order.getOrderDetail
  );
  app.router.post('/user/uploadAvatar', user.uploadAvatar);
};
