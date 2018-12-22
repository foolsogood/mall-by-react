import serverClient from "./serverClient";
let getApiServer = (function() {
  let host = "http://127.0.0.1:7001";
if (process.env.NODE_ENV === "production") {
  host = "http://120.79.226.148:3000";
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
