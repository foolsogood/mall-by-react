import fetch from "dva/fetch";
import event from "utils/event";
import Cookies from "js-cookie";
import { server } from "./config";
const checkStatus = response => {
  const { status } = response;
  // console.log(status)
  if (status >= 200 && status < 300) {
    window.$hideLoading.call(null);
    return Promise.resolve(response);
  } else {
    if ([403, 401].includes(status)) {
      // token失效
      console.log('token 失效')
      event.emit("showLogin", true);
    }
    return Promise.reject(response);
  }
};
const loading_option_default = {
  ifLoadingShow: true,
  loadingText: "加载中……"
};
export const request = (url, options = null) => {
  console.log('op',options)
  const defaultOption = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": Cookies.get("token"),
    }
  };
  let newOption = {};
  if (options) {
    if(!options.loading){
      options.loading=loading_option_default
    }
    if(options.loading.ifLoadingShow){
        //显示loading
        window.$showLoading.call(null);
    }
    newOption = Object.assign({}, defaultOption, options);
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
      console.error('111',err);
    });
};


export default {
  request
};
