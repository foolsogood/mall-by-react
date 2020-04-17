import { inject, provide } from 'midway'
import { IOrderItemModel } from '@models/orderItem'
import { IInsertOrderItem } from './interface'
export interface IOrderItemService extends OrderItemService { }

@provide()
export class OrderItemService {
    @inject()
    private OrderItemModel!: IOrderItemModel

    async list(orderId: number) {
        return await this.OrderItemModel.findAll({
            raw:true,
            where: {
                orderId: orderId
            }
        })
    }
 


    async add(data: IInsertOrderItem) {
        console.log('IInsertOrderItem',data)
        return await this.OrderItemModel.create(data);
    }
    
}