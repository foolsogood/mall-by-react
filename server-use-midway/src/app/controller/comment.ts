import { Context, controller, provide, get, post, del, inject } from "midway";
import { ICommentService } from "@services/comment/index";
@provide()
@controller("/comment")
export class CommentController {
  constructor() {}
  @inject()
  commentService: ICommentService;

  @get("/list/:goodId")
  async index(ctx: Context) {
    const { goodId } = ctx.params;
    ctx.successHandler(await this.commentService.list(goodId));
  }
  @post("/add/:goodId", { middleware: ["jwtMiddleware"] })
  //   @post("/add/:goodId")
  async add(ctx: Context) {
    const {
      params: { goodId }
    } = ctx;
    const { body } = ctx.request;
    ctx.successHandler(await this.commentService.add(goodId, body));
  }
  @del("/:commentId", { middleware: ["jwtMiddleware"] })
  async del(ctx: Context) {
    const { params } = ctx;
    const { commentId } = params;
    ctx.successHandler(await this.commentService.del(commentId));
  }
}
