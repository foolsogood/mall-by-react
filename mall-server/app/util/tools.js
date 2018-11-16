class tools {
    //订单号
  createTradeNo() {
    let outTradeNo = "";
    for (let i = 0; i < 6; i++) {
      outTradeNo += Math.floor(Math.random() * 10);
    }
    return new Date().getTime() + outTradeNo;
  }
}
//tool实例单例
let toolSingleTon = (function() {
  let _tool;
  return function() {
    if (!_tool) {
      _tool = new tools();
    }
    return _tool;
  };
})();
module.exports = toolSingleTon();
