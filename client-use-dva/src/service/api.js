const api = {
  good: {
    getGoodsByCate: "/good/getGoodByCateId/:cateId",
    getGoodById: "/good/getGoodDetail/:goodId",
    getNewGoods: "/good/getNewGoods",
    getHotGoods: "/good/getHotGoods",
    searchGood: "/good/searchGood",
    collectGood: "/good/collectGood/:goodId",
    getCollectGood: "/good/getCollectGood",
    getGoodComment: "/good/getGoodComment/:goodId",
    addGoodComment: "/good/addGoodComment"
  },
  category: {
    getCates: "/category/getAllCategory"
  },
  banner: {
    getHomeBanner: "/home/getBanner"
  },
  user: {
    login: "/user/login",
    signup: "/user/register",
    uploadAvatar: "/user/uploadAvatar"
  },
  phone: {
    bindPhone: "/phone/bindPhone",
    sendSms: "/phone/sendSms"
  },
  order: {
    getOrders: "/order/getOrder",
    addOrder: "/order/addOrder",
    getOrderDetail: "/order/getOrderDetail"
  },
  upload: "/upload"
};
export default api;
