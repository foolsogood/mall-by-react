/*对接口请求返回的数据进行统一处理*/
import axios from "axios";
import qs from "qs";
import event from "utils/event";

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const { status, data } = response;
    if (status >= 200 && status < 400 && data.code===1) {
      //隐藏loading
      window.$hideLoading.call(null);
      return Promise.resolve(response.data);
    }else{
      return new Error(response.data)
    }
  },
  error => {
    const { status, data } = error.response;
    if ([403, 401].includes(status)) {
      // token失效
      console.error("token 失效");
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
  return [url].concat(params).join("/");
}

//默认地址获取
function get(url, { params = [], query = {} }) {
  return axios.get(finalUrl(url, params), { params: query });
}
function post(url, { params = [], query = {} }) {
  return axios.post(finalUrl(url, params), qs.stringify(query));
}
function post_formdata(url, { params = [], formdata = {} }) {
  return axios.post(finalUrl(url, params), formdata, {
    headers: { "Content-Type": "multipart/form-data;boundary=%s" }
  });
}
function put(url, { params = [], query = {} }) {
  return axios.put(finalUrl(url, params), qs.stringify(query));
}
function del(url, { params = [], query = {} }) {
  return axios.del(finalUrl(url, params), qs.stringify(query));
}

export default {
  get,
  post,
  put,
  del,
  post_formdata
};
