'use strict';
const path = require('path');
const Service = require('egg').Service;
class UploadService extends Service {
  async upload() {
    const { ctx } = this;
    const { files } = ctx.request;
    console.log('files',files)
    const uploadAll = () => {
      let arr = [];
      for (let _file of files) {
        const { filename, filepath } = _file;
        let result = ctx.oss.put(filename, filepath);
        arr.push(result);
      }
      return Promise.all(arr);
    };
    const uploadRes = await uploadAll();
    const urlList = uploadRes.map(item => item.url);
    const { token, ...resArguments } = ctx.request.body;
    const data = await ctx.service.token.verifyToken(token);
    const { userid } = data;
    return {
      ...resArguments,
      urlList,
      userid
    };
  }
}
module.exports = UploadService;
