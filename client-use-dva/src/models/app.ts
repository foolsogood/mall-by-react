import { Model } from "dva";

export default {
  namespace: "app",

  state: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {
          avatar: null,
          phone: null,
          userId: null,
          username: null
        },
   
  },

  subscriptions: {},

  effects: {
    *changeUser({ payload }, { call, put }) {
      yield put({ type: "getUser", payload });
    },
    
  },

  reducers: {
    getUser(state, { payload }) {
      const user = Object.assign({}, state.user, payload);
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user
      };
    },
   
  }
} as Model;
