import fetch from "dva/fetch";
import event from "utils/event";
import Cookies from "js-cookie";
import { server } from "./config";
import { mockRequest } from "../mock/request";

const checkStatus = response => {
  const { status } = response;
  if (status >= 200 && status < 300) {
    window.$hideLoading.call(null);
    return Promise.resolve(response);
  } else {
    if ([403, 401].includes(status)) {
      // token失效
      console.log("token 失效");
      console.log(response);
      event.emit("showLogin", true);
      // TODO 将当前url缓存，登录后重新请求
      // const { url } = response;
      // sessionStorage.setItem('re_request_url')
    }
    return Promise.reject(response);
  }
};
const loading_option_default = {
  ifLoadingShow: true,
  loadingText: "加载中……"
};
export const request = async (url, options = null) => {
  // 如果是mock环境 直接使用本地mock数据
  // console.log("op", options);
  if (process.env.NODE_ENV === "mock") {
    return await mockRequest({ url, originUrl: options.originUrl });
  }
  const defaultOption = {
    headers: {
      Authorization: Cookies.get("token")
    }
  };
  if (["POST", "PUT", "DELETE"].includes(options.method)) {
    defaultOption.headers["Content-Type"] = "application/json";
  }
  let newOption = {};
  if (options) {
    options.loading = Object.assign(
      {},
      loading_option_default,
      options.loading
    );
    if (options.loading.ifLoadingShow) {
      //显示loading
      window.$showLoading(options.loading.loadingText);
    }
    newOption = Object.assign({}, defaultOption, options);
    // console.log("newOption", newOption);
  } else {
    newOption = defaultOption;
  }
  // console.log(newOption)
  return fetch(server + url, newOption)
    .then(checkStatus)
    .then(res => {
      if (res.status === 204) {
        return res.text();
      }
      return res.json();
    })
    .catch(err => {
      console.error("111", err);
    });
};

export default {
  request
};
