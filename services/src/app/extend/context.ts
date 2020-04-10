module.exports = {
    /*
     *@description: 统一处理成功的返回实体
     *@author: foolsogood<851809776@qq.com> 
     *@date: 2020-04-08 10:21:00
    */
  successHandler(data) {
    this.status = 200;
    this.body = {
      data,
      code: 1,
      message: "success"
    };
  },
  /*
   *@description: 统一处理失败的返回实体
   *@author: foolsogood<851809776@qq.com> 
   *@date: 2020-04-08 10:21:40
  */
  errorHandler(error,status:number=500) {
    this.status = status;
    this.body = {
      data: error,
      code: 0,
      message: "fail"
    };
  }
};
