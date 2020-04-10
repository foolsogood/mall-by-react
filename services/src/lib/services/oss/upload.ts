import { provide, config } from "midway";
// import { ITokenService } from "../token/index";
// import { OssClient } from "@utils/upload";
export interface IOssService extends OssService {}

@provide()
export class OssService {
  // @inject()
  // private tokenService: ITokenService;
  @config("oss")
  oss;

  async upload({ files, body }) {
    console.log("files", files);
    // new OssClient().upload().then(res=>{
    //   console.log(res)
    // }).catch(err=>{
    //   console.log(err)
    // })
    // const uploadAll = () => {
    //   let arr = [];
    //   for (let _file of files) {
    //     const { filename, filepath } = _file;
    //     let result = this.oss.put(filename, filepath);
    //     arr.push(result);
    //   }
    //   return Promise.all(arr);
    // };
    // const uploadRes = await uploadAll();
    // const urlList = uploadRes.map(item => item.url);
    // const { token, ...resArguments } = body;
    // const data = await this.tokenService.verifyToken(token);
    // const { userId } = data;
    // console.log(data)
    // return {
    //   ...resArguments,
    //   urlList
    //   userId
    // };
  }
}
