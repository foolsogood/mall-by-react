import { providerWrapper } from 'midway'
import { Column, CreatedAt, UpdatedAt, DataType, Model, Scopes, Table } from 'sequelize-typescript'
const { INTEGER, UUID, BIGINT, UUIDV4, DOUBLE} = DataType;
export const factory = () => OrderItemModel
providerWrapper([
    {
        id: 'OrderItemModel',
        provider: factory
    }
])
export type IOrderItemModel = typeof OrderItemModel

@Scopes({
    avaliable: {
        where: { status: 1 }
    }
})
@Table({
    freezeTableName: true,
    tableName: 'orderItem'
})
export class OrderItemModel extends Model<OrderItemModel>{
    @Column({
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: BIGINT,
        allowNull: false,
        comment: '订单id'
    })
    orderId!: number;

    @Column({
        type: UUID,
        defaultValue:UUIDV4,
        allowNull: false,
        comment:'订单项id'
    })
    orderItemId!: string;

    @Column({
        type: UUID,
        allowNull: false,
        comment:'商品id'
    })
    goodId!: string;

    @Column({
        type: DOUBLE,
        allowNull: false,
        comment:'商品价格'

    })
    price!: number;

    @Column({
        type: INTEGER,
        allowNull: false,
        comment:'商品数量'

    })
    number!: number;


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
