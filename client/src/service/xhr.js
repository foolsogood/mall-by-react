/*对接口请求返回的数据进行统一处理*/
import axios from "axios";
import qs from "qs";
import event from "utils/event";
import Cookies from "js-cookie";

// http request 拦截器，请求时拦截
axios.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/json'
    config.headers.Authorization = Cookies.get("token");
    return config;
  },
  err => {
    return Promise.reject(err);
  });
// http response 拦截器
axios.interceptors.response.use(
  response => {
    const { status, data } = response;
    if (status >= 200 && status < 400 && data.code===1) {
      //隐藏loading
      window.$hideLoading.call(null);
      return Promise.resolve(data);
    }else{
      throw new Error(data)
    }
  },
  error => {
    const { status, data } = error.response;
    if ([403, 401].includes(status)) {
      // token失效
      // console.error("token 失效");
      event.emit("showLogin", true);
      window.$hideLoading.call(null);
      return Promise.reject(data);
    } else {
      console.error("error", error);
      return Promise.reject(data);
    }
  }
);
function finalUrl(url, params) {
  if (!params) return url;
  Object.keys(params).forEach(item => {
    url = url.replace(":" + item, params[item]);
  });
  return url;
}

//默认地址获取
function get(url, { params = null, query = {} }) {
  return axios.get(finalUrl(url, params), { params: query });
}
function post(url, { params = null, query = {} }) {
  return axios.post(finalUrl(url, params), qs.stringify(query));
}
function post_formdata(url, { params = null, formdata = {} }) {
  return axios.post(finalUrl(url, params), formdata, {
    headers: { "Content-Type": "multipart/form-data;boundary=%s" }
  });
}
function put(url, { params = null, query = {} }) {
  return axios.put(finalUrl(url, params), qs.stringify(query));
}
function del(url, { params = null, query = {} }) {
  return axios.del(finalUrl(url, params), qs.stringify(query));
}

export default {
  get,
  post,
  put,
  del,
  post_formdata
};
