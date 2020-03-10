import { Context, controller, provide, get, post, del, inject } from 'midway'
import { IGoodService } from '@services/good/index'
import { ICommentService } from '@services/comment/index'

@provide()
@controller('/good')
export class GoodController {
    constructor() { }
    @inject()
    goodService: IGoodService
    @inject()
    commentService: ICommentService

    @get('/:goodId')
    async  detail(ctx: Context) {
        const { params: { goodId } } = ctx;
        const good = await this.goodService.detail(goodId)
        const comment = await this.commentService.list(goodId)
        const d=good.get({'plain':true})
        ctx.body = {
            ...d,
            comment
        };
    }
    @get('/cate/:cateId')
    async  listByCateId(ctx: Context) {
        const { params: { cateId } } = ctx;
        ctx.body = await this.goodService.listByCateId(cateId)
    }
    @post('/add')
    async  add(ctx: Context) {
        const { body } = ctx.request
        ctx.body = await this.goodService.add(body)
    }
    @del('/:goodId')
    async  del(ctx: Context) {
        const { params } = ctx
        const { goodId } = params
        ctx.body = await this.goodService.del(goodId)
    }
}