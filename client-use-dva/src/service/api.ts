export const api:any = {
  good: {
    getGoodsByCate: "/good/cate/:cateId",
    getGoodById: "/good/:goodId",
    getNewGoods: "/good/new",
    getHotGoods: "/good/hot",
    searchGood: "/good/searchGood",
    collectGood: "/collect/collectGood/:goodId",
    getCollectGood: "/collect/list",
    getGoodComment: "/comment/list/:goodId",
    addGoodComment: "/comment/add/:goodId"
  },
  category: {
    getCates: "/category/list"
  },
  banner: {
    getHomeBanner: "/banner/list"
  },
  user: {
    login: "/user/login",
    signup: "/user/register",
    uploadAvatar: "/user/uploadAvatar"

  },
  phone: {
    bindPhone: "/sms/bindPhone",
    sendSms: "/sms/sendSms"
  },
  order: {
    getOrders: "/order/list",
    addOrder: "/order/add",
    getOrderDetail: "/order/detail/:orderId"
  },
  upload: "/oss/upload"
};
export default api;
