import { inject, provide } from 'midway'
import { IOrderModel } from '@models/order'
import { IOrderItemService } from './orderItem'

import { IInsertOrder } from './interface'
import { formatTime } from '../../utils/tool'
export interface IOrderService extends OrderService { }

@provide()
export class OrderService {
    @inject()
    private OrderModel!: IOrderModel
    @inject()
    orderItemService: IOrderItemService

    async list(userId: number) {
        const o=await this.OrderModel.findAndCountAll({
            raw:true,
            where: {
                userId: userId
            }
        })
        // const orderList=o.get({'plain':true})
        console.log(o)
        // const orderList=deepCopy(o)
        for(const item of o.rows){
            const {orderId}=item
            // TODO 
            // item.list=[]
           this.orderItemService.list(orderId).then(res=>{
               console.log('res',res.rows)
            //    item.list.push(res)
           })

        }
        return o
    }
    async createOrderId() {
        // 随机生成N位数字
        const randomNum=len=>Math.random().toString().substr(2,len);
        const t=formatTime(new Date(),'timeNumber')
        const a=randomNum(4)
        return Number(''+t+a)
    }


    async add(data: IInsertOrder) {
        console.log('IInsertOrder',data)
        return await this.OrderModel.create(data);
    }
    async del(orderId: string) {
        return await this.OrderModel.destroy({
            where: {
                orderId: orderId
            }
        });
    }
}