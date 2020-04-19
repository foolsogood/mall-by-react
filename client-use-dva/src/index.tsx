import dva from 'dva';
// import createLoading from "dva-loading";
import middleware from 'utils/middleware';
import api from 'service/api';
import * as http from 'service/xhr';
import { createBrowserHistory as createHistory } from "history";
import 'assets/style/public.css'
import 'assets/style/main.css'
import 'assets/js/reset.js'



window.$http = http;
window.$api = api;
Object.keys(middleware).forEach(item => {
  window[`$${item}`] = middleware[item];
});
const app = dva({
  history: createHistory(),
  // loading: createLoading({}),
  onError(e, dispatch) {
    console.error('onerror', e);
  }
});
app.model({ namespace: 'app', ...require('./models/app').default });
app.model({
  namespace: 'shopCart',
  ...require('./models/shopCart').default
});
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
console.log('process.env.NODE_ENV is', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  document.write(
    '<script src="https://cdn.bootcss.com/react/16.7.0-alpha.2/cjs/react.production.min.js"></script>'
  );
  document.write(
    '<script src="https://cdn.bootcss.com/react-dom/16.7.0-alpha.2/cjs/react-dom-server.browser.production.min.js"></script>'
  );
  document.write(
    '<script src="https://cdn.bootcss.com/react-router-dom/4.4.0-beta.6/react-router-dom.min.js"></script>'
  );

  //   document.write(
  //     '<script src="//cdn.bootcss.com/eruda/1.5.2/eruda.min.js"></script>'
  //   );
  //   document.write("<script>eruda.init()</script>");
}
