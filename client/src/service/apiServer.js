import serverClient from "./serverClient";
let getApiServer = (function() {
  const host = "http://127.0.0.1:7001";
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
