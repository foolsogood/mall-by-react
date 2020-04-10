import { Context, controller, provide, post, inject ,config} from "midway";
import { IOssService } from "@services/oss/upload";

@provide()
@controller("/oss")
export class UploadController {
  constructor() {}
  @inject()
  ossService: IOssService;
  @config("multipart")
  multipart
  @post("/upload")
  async upload(ctx: Context) {
    try{
    const { files, body } = ctx.request;
    // ctx.headers['Content-Type']='multipart/*'
    console.log(ctx.multipart)
    const parts= ctx.multipart()
    console.log( parts)
    // console.log(ctx.request,files,body)
    ctx.successHandler(await this.ossService.upload({ files, body }));
    }catch(err){
      console.log(err)
    }
  }
}
