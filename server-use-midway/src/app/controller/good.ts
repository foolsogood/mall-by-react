import { Context, controller, provide, get, post, del, inject } from "midway";
import { IGoodService } from "@services/good/index";
import { ICommentService } from "@services/comment/index";
// import {ISearchGood} from '@services/good/interface'

@provide()
@controller("/good")
export class GoodController {
  constructor() {}
  @inject()
  goodService: IGoodService;
  @inject()
  commentService: ICommentService;

  @get("/hot")
  async hot(ctx: Context) {
    ctx.successHandler(await this.goodService.hot());
  }

  @get("/new")
  async new(ctx: Context) {
    ctx.successHandler(await this.goodService.new());
  }

  @get("/searchGood")
  async searchGood(ctx: Context) {
    const {
      query: { keyword }
    } = ctx.request;
    ctx.successHandler(await this.goodService.searchGood(keyword));
  }

  @get("/:goodId")
  async detail(ctx: Context) {
    const {
      params: { goodId }
    } = ctx;
    const good = await this.goodService.detail(goodId);
    const comments = await this.commentService.list(goodId);
    const d = good.get({ plain: true });
    ctx.successHandler({
      ...d,
      comments
    });
  }

  @get("/cate/:cateId")
  async listByCateId(ctx: Context) {
    const {
      params: { cateId }
    } = ctx;
    ctx.successHandler(await this.goodService.listByCateId(cateId));
  }

  @post("/add")
  async add(ctx: Context) {
    const { body } = ctx.request;
    ctx.successHandler(await this.goodService.add(body));
  }
  @del("/:goodId")
  async del(ctx: Context) {
    const { params } = ctx;
    const { goodId } = params;
    ctx.successHandler(await this.goodService.del(goodId));
  }
}
