const api={
    good:{
        addGood:'/api/good/addGood',
        getAllGoods:'/api/good/getAllGoods',
        getGoodsByCate:'/api/good/getGoodsByCate',
        getGoodById:'/api/good/getGoodById',
        getNewGoods:'/api/good/getNewGoods',
        getHotGoods:'/api/good/getHotGoods',
        searchGood:'/api/good/searchGood',
        
    },
    category:{
        getCates:'/api/category/getCates'
    },
    banner:{
        getHomeBanner:'/api/banner/getHomeBanner'
    },
    user:{
        login:'/api/user/login',
        signup:'/api/user/signup',
        bindPhone:'/api/user/bindPhone'
    },
    order:{
        getOrders:'/api/order/getOrders',
        addOrder:'/api/order/addOrder',
    }
}
export default api