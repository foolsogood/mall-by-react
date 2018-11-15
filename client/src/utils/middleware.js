import store from "store";
import event from "utils/event";

const middleware = {
  //ajax预处理
  preAjaxHandler() {
    return function(response) {
      if (response.code===1) {
        //loading消失
        $hideLoading();
        return Promise.resolve(response);
      } else if (response.code === -2) {
        // token失效
        console.error("token 失效");
        event.emit("showLogin", true);
        return Promise.reject(response);
      } else {
        return Promise.reject(response);
      }
    };
  },
  //ajax错误处理
  commonErrorHandler(url) {
    return function(errorMsg) {
      console.error(`url:${url}`, errorMsg);

      throw errorMsg;
    };
  },
  //显示loading
  showLoading(txt = "加载中……") {
    store.commonQuery.setLoading(true, txt);
    setTimeout(() => {
      //默认3秒消失
      $hideLoading.call(null);
    }, 1000 * 3);
  },
  hideLoading() {
    store.commonQuery.setLoading(false);
  }
};
export default middleware;
