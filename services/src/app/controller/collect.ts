import { Context, controller, provide, get, post, del, inject } from 'midway'
import { ICollectService } from '@services/collect/index'
@provide()
@controller('/collect')
export class CollectController {
    constructor() { }
    @inject()
    collectService: ICollectService

    @get('/list',{middleware:['jwtMiddleware']})
    async  index(ctx: Context) {
        const {userId}=ctx.query
        ctx.body = await this.collectService.list(userId)
    }
    @get('/isCollect')
    async  isCollect(ctx: Context) {
        const {query}=ctx
        ctx.body = await this.collectService.isCollect(query)
    }
    @post('/toggle')
    async  toggle(ctx: Context) {
        const { body } = ctx.request
        ctx.body = await this.collectService.toggle(body)
    }
    @del('/:id')
    async  del(ctx: Context) {
        const { params } = ctx
        const {id}=params
        ctx.body = await this.collectService.del(id)
    }
}