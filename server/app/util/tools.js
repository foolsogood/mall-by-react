'use strict';
class tools {
  // 订单号
  createTradeNo() {
    let outTradeNo = '';
    for (let i = 0; i < 6; i++) {
      outTradeNo += Math.floor(Math.random() * 10);
    }
    return new Date().getTime() + outTradeNo;
  }
  guid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }
}
// tool实例单例
const toolSingleTon = (function() {
  let _tool;
  return function() {
    if (!_tool) {
      _tool = new tools();
    }
    return _tool;
  };
})();
module.exports = toolSingleTon();
