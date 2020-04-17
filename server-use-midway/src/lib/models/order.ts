import { providerWrapper } from 'midway'
import { Column, CreatedAt, UpdatedAt, DataType, Model, Scopes, Table } from 'sequelize-typescript'
// import {OrderItemModel} from './orderItem'
const { INTEGER,  BIGINT, TINYINT } = DataType;
export const factory = () => OrderModel
providerWrapper([
    {
        id: 'OrderModel',
        provider: factory
    }
])
export type IOrderModel = typeof OrderModel

@Scopes({
    avaliable: {
        where: { status: 1 }
    }
})
@Table({
    freezeTableName: true,
    tableName: 'order'
})
export class OrderModel extends Model<OrderModel>{
    @Column({
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    // @ForeignKey(()=>OrderItemModel)
    @Column({
        type: BIGINT,
        allowNull: false,
        comment: '订单id'
    })
    orderId!: number;

    @Column({
        type: INTEGER,
    })
    userId!: number;

    @Column({
        type: TINYINT,
        defaultValue: -1,
        allowNull: false,
        comment: '订单状态,-1未支付，1待发货，2待收货，99待评价，'
    })
    status!: number;


    @CreatedAt
    @Column({
        field: 'created_at'
    })
    created_at!: Date;

    @UpdatedAt
    @Column({
        field: 'updated_at'
    })
    updated_at!: Date;

}
