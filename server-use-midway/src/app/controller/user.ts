import { Context, controller, provide, post, del, inject } from "midway";
import { IUserService } from "@services/user/index";
@provide()
@controller("/user")
export class UserController {
  constructor() {}
  @inject()
  userService: IUserService;

  @post("/login")
  async index(ctx: Context) {
    const { body } = ctx.request;
    ctx.successHandler(await this.userService.login(body));
  }
  @post("/register")
  async register(ctx: Context) {
    const { body } = ctx.request;
    ctx.successHandler(await this.userService.register(body));
  }
  @post("/uploadAvatar",{ middleware: ["jwtMiddleware"] })
  async uploadAvatar(ctx: Context) {
    ctx.successHandler(await this.userService.uploadAvatar());
  }
  @del("/:userId",{ middleware: ["jwtMiddleware"] })
  async del(ctx: Context) {
    const { params } = ctx;
    const { userId } = params;
    ctx.successHandler(await this.userService.del(userId));
  }
}
