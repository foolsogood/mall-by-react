import dva from "dva";
import {createBrowserHistory as createHistory} from "history";
import createLoading from 'dva-loading';
import middleware from "utils/middleware";
import apiServer from "service/apiServer";
import api from "service/api";
window.window.$apiServer = apiServer;
window.window.$api = api;
Object.keys(middleware).forEach(item => {
  window[`$${item}`] = middleware[item];
});
const app = dva({
  history: createHistory(),
  loading:createLoading({}),
  onError(e,dispatch){
    console.log(e)
  }
});
app.model({ namespace: "app", ...require("./models/app.js").default });
app.model({
  namespace: "shopCart",
  ...require("./models/shopCart.js").default
});
// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
console.log("process.env.NODE_ENV is", process.env.NODE_ENV);

// if (process.env.NODE_ENV === "development") {
//   document.write(
//     '<script src="//cdn.bootcss.com/eruda/1.5.2/eruda.min.js"></script>'
//   );
//   document.write("<script>eruda.init()</script>");
// }
