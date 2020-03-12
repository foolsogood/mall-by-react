
export function formatTime(time, type = 'ymdhms') {
  const _formatFn = unit => (unit < 10 ? '0' + unit : '' + unit);
  const timezone = 8; // 目标时区时间，东八区
  const ti = new Date(time);
  ti.setTime(ti.getTime() + timezone * 60 * 60 * 1000);
  ti.toUTCString();
  const t = new Date(ti);
  const y = t.getFullYear();
  let month = '' + t.getMonth() + 1;
  month = _formatFn(month);
  let d = '' + t.getDate();
  d = _formatFn(d);
  let h = '' + t.getHours();
  h = _formatFn(h);
  let min = '' + t.getMinutes();
  min = _formatFn(min);
  let s = '' + t.getSeconds();
  s = _formatFn(s);
  const day = t.getDay();
  const op = {
    timeNumber: `${y}${month}${d}${h}${min}`,
    timeStamp: t.getTime(),
    ymdhms: `${y}-${month}-${d} ${h}:${min}:${s}`,
    ymdhm: `${y}-${month}-${d} ${h}:${min}`,
    ymdh: `${y}-${month}-${d} ${h}`,
    ymd: `${y}-${month}-${d}`,
    ymd_num: `${y}${month}${d}`,
    _mdhm: `${month}:${d}:${h}:${min}`,
    hmin: `${h}:${min}`,
    ymd_zn: `${y}年${month}月${d}日`,
    ym_zn: `${y}年${month}月`,
    ymdhms_ios: `${y}/${month}/${d} ${h}:${min}:${s}`,
    ymdhm_ios: `${y}/${month}/${d} ${h}:${min}`,
    ymdh_ios: `${y}/${month}/${d} ${h}`,
    ymd_ios: `${y}/${month}/${d}`,
    timeObj: {
      timeStamp: t,
      year: y,
      month,
      date: d,
      hour: h,
      min,
      day
    }
  };
  try {
    return op[type];
  } catch (err) {
    throw new Error('时间格式化类型不对');
  }
}
export function deepCopy<T>(obj1: T): T {
  const isObject = (obj: any): boolean => (typeof obj === 'object') === true;

  const isType = (obj: any): string => Object.prototype.toString.call(obj).slice(8, -1);
  let resObj = undefined;
  //引用类型
  if (isObject) {
    if (isType(obj1) === 'Array') {
      resObj = [];
      for(const i in obj1){
        if (isObject(obj1[i])) {
          resObj[i] = deepCopy(obj1[i]);
        } else {
          resObj[i] = obj1[i];
        }
      }
      // for (let i = 0; i < (obj1 as any).length; i++) {
      //   if (isObject(obj1[i])) {
      //     resObj[i] = deepCopy(obj1[i]);
      //   } else {
      //     resObj[i] = obj1[i];
      //   }
      // }
    }
    if (isType(obj1) === 'Object') {
      resObj = {};
      for (const key in obj1) {
        if (isObject(obj1[key])) {
          resObj[key] = deepCopy(obj1[key]);
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