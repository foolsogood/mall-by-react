import { Context, controller, provide, get, post, inject } from "midway";
import { IAliyunSmsService } from "@services/aliyunSms/index";
@provide()
@controller("/sms")
export class AliyunSmsController {
  constructor() {}
  @inject()
  aliyunSmsService: IAliyunSmsService;
  @get("/sendSms")
  async sendSms(ctx: Context) {
    const { phone } = ctx.request.query;
    ctx.successHandler(await this.aliyunSmsService.sendSms(phone));
  }
  @post("/bindPhone")
  async bindPhone(ctx: Context) {
    ctx.successHandler(await this.aliyunSmsService.bindPhone());
  }
  @get("/validateCode")
  async validateCode(ctx: Context) {
    const { phone, code } = ctx.request.query;
    ctx.successHandler(await this.aliyunSmsService.validateCode(phone, code));
  }
}
