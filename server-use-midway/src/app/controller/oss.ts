import { Context, controller, provide, post, inject } from "midway";
import { IOssService } from "@services/oss/upload";

@provide()
@controller("/oss")
export class UploadController {
  constructor() {}
  @inject()
  ossService: IOssService;
  @post("/upload")
  async upload(ctx: Context) {
    try {
      ctx.successHandler(await this.ossService.upload());
    } catch (err) {
      console.log(err);
    }
  }
}
