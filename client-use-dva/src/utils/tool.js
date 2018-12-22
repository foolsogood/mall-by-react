class tool {
  formatTime(time, type = "ymdhms") {
    const _formatFn = unit => (unit < 10 ? "0" + unit : unit);
    const t = new Date(time);
    const y = t.getFullYear();
    let month = t.getMonth() + 1;
    month = _formatFn(month);
    let d = t.getDay();
    d = _formatFn(d);
    let h = t.getHours();
    h = _formatFn(h);
    let min = t.getMinutes();
    min = _formatFn(min);
    let s = t.getSeconds();
    s = _formatFn(s);
    const op = {
      ymdhms: `${y}-${month}-${d} ${h}:${min}:${s}`,
      ymdhm: `${y}-${month}-${d} ${h}:${min}`,
      ymdh: `${y}-${month}-${d} ${h}`,
      ymd: `${y}-${month}-${d}`
    };
    try {
      return op[type];
    } catch (err) {
      throw new Error("时间格式化类型不对");
    }
  }
  //比较两个数据是否相等
  checkIfEual(objA, objB) {
    const isType = obj => Object.prototype.toString.call(obj).slice(8, -1);
    //构造函数不同
    if (isType(objA) !== isType(objB)) {
      return false;
    }
    //引用类型
    if (typeof objA === "object") {
      if (isType(objA) === "Object") {
        const objAValArr = Object.values(objA);
        const objBValArr = Object.values(objB);
        if (objAValArr.length !== objBValArr.length) {
          return false;
        }
        return Object.keys(objA).every(item => {
          if (typeof objA[item] === "object") {
           return this.checkIfEual(objA[item], objB[item]);
          } else {
            return objA[item] === objB[item];
          }
        });
      }
      if (isType(objA) === "Array") {
        const lenA = objA.length;
        const lenB = objB.length;
        if (lenA !== lenB) {
          return false;
        }
        for (let i = 0; i < lenA; i++) {
          if (typeof objA[i] === "object") {
            return this.checkIfEual(objA[i], objB[i]);
          }
          if (objA[i] !== objB[i]) {
            return false;
          }
        }
        //所有下标值都相同
        return true;
      }
    } else {
      //基本类型直接比较数值
      return objA === objB;
    }
  }
  //节流
  throttle(fn, delay) {
    let endTime, deferTimer;
    return function(args) {
      let startTime = +new Date();
      if (endTime && Math.abs(+new Date() - startTime) < delay) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(() => {
          endTime = +new Date();
          fn.apply(this, args);
        }, delay);
      } else {
        endTime = +new Date();
        fn.apply(this, args);
      }
    };
  }
  //深拷贝
  deepCopy = obj1 => {
    const isObject = obj => (typeof obj === "object") === true;

    const isType = obj => Object.prototype.toString.call(obj).slice(8, -1);
    let resObj = undefined;
    //引用类型
    if (isObject) {
      if (isType(obj1) === "Array") {
        resObj = [];
        for (let i = 0; i < obj1.length; i++) {
          if (isObject(obj1[i])) {
            resObj[i] = this.deepCopy(obj1[i]);
          } else {
            resObj[i] = obj1[i];
          }
        }
      }
      if (isType(obj1) === "Object") {
        resObj = {};
        for (let key in obj1) {
          if (isObject(obj1[key])) {
            resObj[key] = this.deepCopy(obj1[key]);
          } else {
            resObj[key] = obj1[key];
          }
        }
      }
    } else {
      //基本类型
      resObj = obj1;
    }
    return resObj;
  };
}
//输出单例
let toolSingleton = (function() {
  let _tool;
  return function() {
    if (!_tool) {
      _tool = new tool();
    }
    return _tool;
  };
})()();
export default toolSingleton;
