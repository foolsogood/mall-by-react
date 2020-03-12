import { Context, controller, provide, get, post, del, inject } from 'midway'
import { IOrderService } from '@services/order/order'
import { IOrderItemService } from '@services/order/orderItem'
import { IGoodService } from '@services/good/index'



@provide()
@controller('/order', { middleware: ['jwtMiddleware'] })
export class OrderController {
    constructor() { }
    @inject()
    orderService: IOrderService
    @inject()
    orderItemService: IOrderItemService
    @inject()
    goodService: IGoodService

    @get('/')
    async  detail(ctx: Context) {
        const { userId } = ctx
        return await this.orderService.list(userId)
    }

    @post('/add')
    async  add(ctx: Context) {
        const { body } = ctx.request
        const { userId } = ctx

        console.log('body', body)
        const orderId = await this.orderService.createOrderId();
        const addOrderRes= await this.orderService.add({
            orderId,
            userId
        })
        console.log('addOrderRes',addOrderRes)
        const promiseArr = []
        for (const item of body) {
            const { goodId, number } = item
            this.goodService.detail(goodId).then(async res => {
                const r=res.get({'plain':true})
                // console.log('r', r)
                const i = this.orderItemService.add({
                    orderId,
                    goodId,
                    number,
                    price: r.price
                })
                promiseArr.push(i)
            })
        }
        const res= await Promise.all(promiseArr)
        console.log('res',res)
        return res;
    }
    @del('/:orderId')
    async  del(ctx: Context) {
        const { params } = ctx
        const { orderId } = params
        ctx.body = await this.orderService.del(orderId)
    }
}