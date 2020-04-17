import { provide, inject } from "midway";
import { guid } from "../../utils/tool";
import { IUploadList, } from "./interface";
export interface IOssService extends OssService {}

@provide()
export class OssService {
  @inject()
  ctx;

  async upload(): Promise<IUploadList | string> {
    const { ctx } = this;
    const parts = ctx.multipart();
    let part;
    // const arr = [];
    const upload_promise_arr = [];
    console.time("upload");
    while ((part = await parts()) != null) {
      if (part.length) {
        // arrays are busboy fields
      } else {
        if (!part.filename) {
          return;
        }
        const { mimeType } = part;
        // 文件后缀
        const idx = mimeType.indexOf("/");
        const fileType = mimeType.slice(idx + 1);
        const result = ctx.oss.put(guid() + "." + fileType, part);
        upload_promise_arr.push(result);
      }
    }
    const arr = await Promise.all(upload_promise_arr);
    // const { name, url } = result as IUpload;
    // arr.push({ name, url });
    console.timeEnd("upload");
    if (arr.length) {
      return arr.map(item=>({name:item.name,url:item.url}));
    }
    return "no data";
  }
}
