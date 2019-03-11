import { request } from "./request";
import { stringify } from "qs";
import Cookies from "js-cookie";

//拼成  xxx/1/3
const finalPath = (url, params) => {
  if (!params) return url;
  Object.keys(params).forEach(item => {
    url = url.replace(":" + item, params[item]);
  });
  return url;
};
// const preHandler = (url, payload) => {
//   const default_data = { query: null, params: {}, loading: null };
//   const data = Object.assign({}, default_data, payload);
//   let { query, params, loading } = data;
//   const finalUrl = finalPath(url, params);
//   const _token = Cookies.get("token");
//   if (_token) {
//     query = {};
//     query.token = _token;
//   }
//   return request(query ? `${finalUrl}?${stringify(query)}` : finalUrl, data);
// };
export function get(url, payload) {
  const default_data = { query: null, params: {}, loading: null };
  const data = Object.assign({}, default_data, payload);
  let { query, params, loading } = data;
  const finalUrl = finalPath(url, params);
  const _token = Cookies.get("token");
  if (_token) {
    if(!query){
      query={}
    }
    query.token = _token;
  }
  return request(query ? `${finalUrl}?${stringify(query)}` : finalUrl,{
    loading
  });
}
export function post(url, payload) {
  const default_data = { query: {}, params: {}, loading: null };
  const data = Object.assign({}, default_data, payload);
  let { query, params, loading } = data;
  const finalUrl = finalPath(url, params);
  const _token = Cookies.get("token");
  if (_token) {
    if(!query){
      query={}
    }
    query.token = _token;
  }
  return request( finalUrl, {
    method: "POST",
    body: JSON.stringify(query),
    loading
  });
}
export function post_formdata(url, payload) {
  const default_data = { formdata: {}, params: {}, loading: null };
  const data = Object.assign({}, default_data, payload);
  let { formdata, params, loading } = data;
  const finalUrl = finalPath(url, params);
  const _token = Cookies.get("token");
  if (_token) {
    if(!formdata){
      formdata={}
    }
    formdata.token = _token;
  }
  return request(finalUrl, {
    method: "POST",
    body: JSON.stringify(formdata),
    headers: { "Content-Type": "multipart/form-data;boundary=%s" },
    loading
  });
}
export function put(url, payload) {
  const default_data = { query: {}, params: {}, loading: null };
  const data = Object.assign({}, default_data, payload);
  let { query, params, loading } = data;
  const finalUrl = finalPath(url, params);
  const _token = Cookies.get("token");
  if (_token) {
    if(!query){
      query={}
    }
    query.token = _token;
  }
  return request( finalUrl, {
    method: "PUT",
    body: JSON.stringify(query),
    loading
  });
}
export default {
  get,
  post,
  put,
  post_formdata
};
