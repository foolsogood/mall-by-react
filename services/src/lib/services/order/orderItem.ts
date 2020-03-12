import { inject, provide } from 'midway'
import { IOrderModel } from '@models/order'
import { IInsertOrderItem } from './interface'
export interface IOrderItemService extends OrderItemService { }

@provide()
export class OrderItemService {
    @inject()
    private OrderItemModel!: IOrderModel

    async list(orderId: number) {
        return await this.OrderItemModel.findAndCountAll({
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