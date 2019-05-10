import { request } from './request';
import { stringify } from 'qs';
//拼成  xxx/1/3
const finalPath = (url, params) => {
  if (!params) return url;
  Object.keys(params).forEach(item => {
    url = url.replace(':' + item, params[item]);
  });
  return url;
};
export function get<T>(url, payload): Promise<T> {
  const default_data = { query: null, params: {}, loading: null };
  const data = Object.assign({}, default_data, payload);
  const { query, params, loading } = data;
  const finalUrl = finalPath(url, params);
  if (process.env.NODE_ENV === 'mock') {
    return request(query ? `${finalUrl}?${stringify(query)}` : finalUrl, {
      loading,
      originUrl: url
    });
  }
  return request(query ? `${finalUrl}?${stringify(query)}` : finalUrl, {
    loading
  });
}
export function post<T>(url, payload): Promise<T> {
  const default_data = { query: {}, params: {}, loading: null };
  const data = Object.assign({}, default_data, payload);
  const { query, params, loading } = data;
  const finalUrl = finalPath(url, params);
  return request(finalUrl, {
    method: 'POST',
    body: JSON.stringify(query),
    loading
  });
}
export function post_formdata<T>(url, payload): Promise<T> {
  const default_data = { formdata: {}, params: {}, loading: null };
  const data = Object.assign({}, default_data, payload);
  const { formdata, params, loading } = data;
  const finalUrl = finalPath(url, params);
  return request(finalUrl, {
    method: 'POST',
    body: JSON.stringify(formdata),
    headers: { 'Content-Type': 'multipart/form-data;boundary=%s' },
    loading
  });
}
export function put<T>(url, payload): Promise<T> {
  const default_data = { query: {}, params: {}, loading: null };
  const data = Object.assign({}, default_data, payload);
  const { query, params, loading } = data;
  const finalUrl = finalPath(url, params);
  return request(finalUrl, {
    method: 'PUT',
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
