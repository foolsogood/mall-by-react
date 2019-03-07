
 const api = {
    good: {
      getGoodsByCate: "/good/getGoodByCateId",
      getGoodById: "/good/getGoodDetail",
      getNewGoods: "/good/getNewGoods",
      getHotGoods: "/good/getHotGoods",
      searchGood: "/good/searchGood",
      collectGood: "/good/collectGood",
      getCollectGood: "/good/getCollectGood",
      getGoodComment: "/good/getGoodComment",
      addGoodComment: "/good/addGoodComment",


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
      uploadAvatar:"/user/uploadAvatar"
    },
    phone:{
      bindPhone: "/phone/bindPhone",
      sendSms: "/phone/sendSms",
    },
    order: {
      getOrders: "/order/getOrder",
      addOrder: "/order/addOrder",
      getOrderDetail: "/order/getOrderDetail"
    },
    upload:"/upload"
  };
if(process.env.NODE_ENV ==='mock'){
  
}

export default api;
