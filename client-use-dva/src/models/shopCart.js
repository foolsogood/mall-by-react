import tool from "utils/tool";
import { routerRedux } from "dva/router";
export default {
  namespace: "shopCart",

  state: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {},
    cartTotalPrice: localStorage.getItem("cartTotalPrice") || 0,
    cartTotalNum: localStorage.getItem("cartTotalNum") || 0
  },

  subscriptions: {},

  effects: {
    *addToCart({ payload }, { put }) {
      yield put({ type: "addToCartHandler", payload });
      yield put({ type: "calcTotalNumHandler" });
      yield put({ type: "calcTotalPriceHandler" });
      yield put(
        routerRedux.push({
          pathname: payload.toPath
        })
      );
    },
    *changeNum({ payload }, { put }) {
      yield put({ type: "changeNumHandler", payload });
      yield put({ type: "calcTotalNumHandler" });
      yield put({ type: "calcTotalPriceHandler" });
    },
    *removeFromCart({ payload }, { put }) {
      yield put({ type: "removeFromCartHandler", payload });
      yield put({ type: "calcTotalNumHandler" });
      yield put({ type: "calcTotalPriceHandler" });
    },
    *popThisFromBalance({ payload }, { put }) {
      yield put({ type: "popThisFromBalanceHandler", payload });
      yield put({ type: "calcTotalNumHandler" });
      yield put({ type: "calcTotalPriceHandler" });
    }
  },

  reducers: {
    //商品总数
    calcTotalNumHandler(state) {
      const cartTotalNum = Object.values(state.cart)
        .filter(item => item.isSelect)
        .reduce((prevTotalNum, cur) => {
          return prevTotalNum + cur.number;
        }, 0);
      localStorage.setItem("cartTotalNum", cartTotalNum);
      return {
        ...state,
        cartTotalNum
      };
    },
    //商品总价
    calcTotalPriceHandler(state) {
      const cartTotalPrice = Object.values(state.cart)
        .filter(item => item.isSelect)
        .reduce((prevTotalPrice, cur) => {
          return prevTotalPrice + cur.number * cur.price;
        }, 0);
      localStorage.setItem("cartTotalPrice", cartTotalPrice);
      return {
        ...state,
        cartTotalPrice
      };
    },
    addToCartHandler(state, { payload }) {
      const cart = tool.deepCopy(state.cart);
      const { goodId, goodInfo } = payload;
      const cartHasThisGood =
        Object.values(cart) &&
        Object.keys(cart).findIndex(item => item === goodId) !== -1;
      if (cartHasThisGood) {
        // console.log('购物车有该商品')
        cart[goodId].number += 1;
      } else {
        // console.log('购物车无该商品')
        cart[goodId] = Object.assign({}, goodInfo, { isSelect: true });
        cart[goodId].number = 1;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return {
        ...state,
        cart
      };
    },
    changeNumHandler(state, { payload }) {
      const { goodId, way } = payload;
      const cart = tool.deepCopy(state.cart);
      //执行购物车的 + 按钮操作
      if (way > 0) {
        cart[goodId].number += 1;
      } else {
        //执行购物车的 - 按钮操作
        cart[goodId].number -= 1;
        if (cart[goodId].number === 0) {
          delete cart[goodId];
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return {
        ...state,
        cart
      };
    },
    /**
     *
     * @param {*} state
     * @param {*} param1:{payload:'goodId'}
     */
    removeFromCartHandler(state, { payload }) {
      const cart = tool.deepCopy(state.cart);
      delete cart[payload];
      localStorage.setItem("cart", JSON.stringify(cart));
      return {
        ...state,
        cart
      };
    },
    popThisFromBalanceHandler(state, { payload }) {
      const cart = tool.deepCopy(state.cart);
      const { goodId, bool } = payload;
      cart[goodId].isSelect = !bool;
      localStorage.setItem("cart", JSON.stringify(cart));
      return {
        ...state,
        cart
      };
    }
  }
};
