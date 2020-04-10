// // import OSS from 'ali-oss'
// // import util from 'util'
// // import fs from 'fs'
// // import path from 'path'

// const OSS = require('ali-oss');
// const util = require('util');
// const fs = require('fs');
// const path = require('path');

// const readdir = util.promisify(fs.readdir);
// // const readFile = util.promisify(fs.readFile);
// const stat = util.promisify(fs.stat);


// export class OssClient  {
//   client: any;
//   constructor() {
//     this.client = new OSS({
//       region: 'oss-cn-shenzhen.aliyuncs.com',
//       accessKeyId: 'LTAI4FdcQ58tbjcBVNqQNhUW', // process.env.ACCESSKEYID,
//       accessKeySecret: 'qO0rVkQl2m7z84VYt9rFGWxQEiUTpt', // process.env.ACCESSKEYSECRET,
//       bucket: 'mall-upload-server'
//     });
//   }
//   /**
//    *
//    *
//    * @param {*} dir
//    * @param {string} [ossDir='/']
//    * @param {*} fileName
//    * @returns
//    * @memberof OssClient
//    */
//   async putStream(dir: any, ossDir = '/', fileName: any) {
//     try {
//       const stream = fs.createReadStream(path.resolve(dir, fileName));
//       return await this.client.putStream(ossDir + fileName, stream);
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   /**
//    *
//    *
//    * @param {*} dir 本地目录地址
//    * @param {*} ossDir  阿里云oss目录地址
//    * @memberof OssClient
//    */
//   async putDir(dir: any, ossDir: any) {
//     let files;
//     try {
//       files = await readdir(dir);
//     } catch (e) {
//       console.log(`【当前目录不存在】 -- ${dir} --`);
//       return
//     }
//     for (const i in files) {
//       const state = await stat(`${dir}/${files[i]}`);
//       if (state.isDirectory()) {
//         await this.putDir(`${dir}/${files[i]}`, `${ossDir}/${files[i]}`);
//       } else {
//         await this.putStream(dir, `${ossDir}/`, files[i]);
//       }
//     }
//   }
  
//   /**
//    *
//    *
//    * @memberof OssClient
//    */
//   async upload() {
//     try {
      
//       await this.putDir(path.resolve(__dirname, './dist'), '/zfz-gov');
//     } catch (e) {
//       console.log('【上传异常请重试】', e);
//     }
//   }
// }