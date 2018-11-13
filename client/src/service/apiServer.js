import serverClient from "./serverClient";
let getApiServer = (function() {
  let host;
  if (process.env.NODE_ENV === "server_use_koa") {
    host = "http://127.0.0.1:3001";
  } else {
    host = "http://127.0.0.1:7001";
  }
  let _sc;
  return function() {
    if (!_sc) {
      _sc = new serverClient(host);
    }
    return _sc;
  };
})();
const apiServer = getApiServer();
export default apiServer;
