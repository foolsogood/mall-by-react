/*对接口请求返回的数据进行统一处理*/
import axios from  'axios'
import qs from 'qs'
function finalUrl(url, params) {
  return [url].concat(params).join('/')
}
//
function handelResponse(res) {
   return Promise.resolve(res.data);
}
//默认地址获取
function get(url, {params = [],query={} }) {
  return axios.get(finalUrl(url, params), {params: query}).then(handelResponse);
}
function post(url, {params = [],query={} }) {
  return axios.post(finalUrl(url,params), qs.stringify(query)).then(handelResponse);
}
function put(url, {params = [],query={} }) {
  return axios.put(finalUrl(url, params), qs.stringify(query)).then(handelResponse);
}
function del(url, {params = [],query={} }) {
  return axios.del(finalUrl(url, params), qs.stringify(query)).then(handelResponse);
}




export  default {
  get,
  post,
  put,
  del
  
}


