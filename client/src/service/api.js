
 const api = {
    good: {
      addGood: "",
      getAllGoods: "",
      getGoodsByCate: "/good/getGoodByCateId",
      getGoodById: "/good/getGoodDetail",
      getNewGoods: "/good/getNewGoods",
      getHotGoods: "/good/getHotGoods",
      searchGood: "/good/searchGood",
      collectGood: "/good/collectGood",
      getCollectGood: "/good/getCollectGood"

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
    },
    phone:{
      bindPhone: "/phone/bindPhone",
      sendSms: "/phone/sendSms",
    },
    order: {
      getOrders: "/order/getOrder",
      addOrder: "/order/addOrder",
      getOrderDetail: "/order/getOrderDetail"
    }
  };


export default api;
