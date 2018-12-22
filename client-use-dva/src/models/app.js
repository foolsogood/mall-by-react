export default {
  namespace: "app",

  state: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {
          avatar: null,
          phone: null,
          userid: null,
          username: null
        },
    loading: {
      isLoadingShow: false,
      loadingTxt: "加载中……"
    }
  },

  subscriptions: {},

  effects: {
    *changeUser({ payload }, { call, put }) {
      yield put({ type: "getUser", payload });
    },
    *changeLoading({ payload }, { call, put }) {
      yield put({ type: "getLoading", payload });
    }
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
    getLoading(state, { payload }) {
      const loading = Object.assign({}, state.loading, payload);
      return {
        ...state,
        loading
      };
    }
  }
};
