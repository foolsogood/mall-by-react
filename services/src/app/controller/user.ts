import { Context, controller, provide,  post, del, inject } from 'midway'
import { IUserService } from '@services/user/index'
@provide()
@controller('/user')
export class UserController {
    constructor() { }
    @inject()
    userService: IUserService

    @post('/login')
    async  index(ctx: Context) {
        const {body}=ctx.request
        ctx.body = await this.userService.login(body)
    }
    @post('/register')
    async  register(ctx: Context) {
        const { body } = ctx.request
        ctx.body = await this.userService.register(body)
    }
    @del('/:userId')
    async  del(ctx: Context) {
        const { params } = ctx
        const {userId}=params
        ctx.body = await this.userService.del(userId)
    }
}