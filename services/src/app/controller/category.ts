import { Context, controller, provide, get, post, del, inject } from 'midway'
import { ICategoryService } from '@services/category/index'
@provide()
@controller('/category')
export class CategoryController {
    constructor() { }
    @inject()
    categoryService: ICategoryService

    @get('/list')
    async  index(ctx: Context) {
        ctx.body = await this.categoryService.list()
    }
    @post('/add')
    async  add(ctx: Context) {
        const { body } = ctx.request
        ctx.body = await this.categoryService.add(body)
    }
    @del('/:id')
    async  del(ctx: Context) {
        const { params } = ctx
        const {id}=params
        ctx.body = await this.categoryService.del(id)
    }
}