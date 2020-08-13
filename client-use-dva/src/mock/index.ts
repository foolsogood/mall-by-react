import banner from "./banner";
import category from "./category";
import good from "./good";
import comments from "./comments";
import api from "service/api";

const getParam = (url: string): string => {
  const lastIdx = url.lastIndexOf("/");
  const _ = url.slice(lastIdx + 1);
  const i = _.indexOf("?");
  if (i !== -1) {
    return _.slice(0, i);
  }
  return _;
};
const getQuery = (url: string): object => {
  const i = url.indexOf("?");
  if (i === -1) {
    return {};
  }
  const obj = url
    .slice(i + 1)
    .split("&")
    .reduce((t, cur) => {
      const [key, value] = cur.split("=");
      t[key] = decodeURI(value);
      // console.log(decodeURI(value), decodeURIComponent(value));
      return t;
    }, {});
  return obj;
};
const getGoodById = (url: string): object => {
  const id = getParam(url);
  const target_good = good.find(item => item.goodId === id);
  const target_comment = comments.filter(item => item.goodId === id);
  target_good.comments.rows = target_comment;
  return target_good;
};
const getGoodComment = (url: string): object => {
  const id = getParam(url);
  const target_comment = comments.filter(item => item.goodId === id);
  return { rows: target_comment };
};
const getGoodsByCate = (url: string): object => {
  const id = getParam(url);
  const target_goods = good.filter(item => item.cateId === id);
  return {
    rows: target_goods
  };
};
const searchGood = (url: string): object => {
  const query = getQuery(url);
  const keyword = Reflect.get(query, "keyword");
  return {
    rows: good.filter(item => item.goodName.includes(keyword))
  };
};
interface MockApi {
  [prop: string]: any;
}
export const mockApi: MockApi = {
  [api.banner.getHomeBanner]: banner,
  [api.category.getCates]: category,
  [api.good.getHotGoods]: {
    rows: good.filter(item => item.isHot)
  },
  [api.good.getNewGoods]: {
    rows: good.filter(item => item.isNew)
  },
  [api.good.searchGood]: searchGood,
  [api.good.getGoodById]: getGoodById,
  [api.good.getGoodComment]: getGoodComment,
  [api.good.getGoodsByCate]: getGoodsByCate
};
export default mockApi;
