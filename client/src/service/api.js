let api = {};
if (process.env.NODE_ENV === "server_use_koa") {
  api = {
    good: {
      addGood: "/api/good/addGood",
      getAllGoods: "/api/good/getAllGoods",
      getGoodsByCate: "/api/good/getGoodsByCate",
      getGoodById: "/api/good/getGoodById",
      getNewGoods: "/api/good/getNewGoods",
      getHotGoods: "/api/good/getHotGoods",
      searchGood: "/api/good/searchGood"
    },
    category: {
      getCates: "/api/category/getCates"
    },
    banner: {
      getHomeBanner: "/api/banner/getHomeBanner"
    },
    user: {
      login: "/api/user/login",
      signup: "/api/user/signup",
      bindPhone: "/api/user/bindPhone"
    },
    order: {
      getOrders: "/api/order/getOrders",
      addOrder: "/api/order/addOrder"
    }
  };
} else {
  api = {
    good: {
      addGood: "",
      getAllGoods: "",
      getGoodsByCate: "/good/getGoodByCateId",
      getGoodById: "/good/getGoodDetail",
      getNewGoods: "/good/getNewGoods",
      getHotGoods: "/good/getHotGoods",
      searchGood: "/good/searchGood",
      collectGood: "/good/collectGood"
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
      bindPhone: ""
    },
    order: {
      getOrders: "/order/getOrder",
      addOrder: "/order/addOrder"
    }
  };
}

export default api;
