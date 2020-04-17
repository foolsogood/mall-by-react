import { providerWrapper } from "midway";
import { Column, DataType, Model, Scopes, Table } from "sequelize-typescript";
// import {OrderModel} from './order'
const { INTEGER, UUID, UUIDV4, BIGINT, DOUBLE, TEXT, STRING, JSON } = DataType;
export const factory = () => OrderItemModel;
providerWrapper([
  {
    id: "OrderItemModel",
    provider: factory
  }
]);
export type IOrderItemModel = typeof OrderItemModel;

@Scopes({
  avaliable: {
    where: { status: 1 }
  }
})
@Table({
  freezeTableName: true,
  tableName: "orderItem"
})
export class OrderItemModel extends Model<OrderItemModel> {
  @Column({
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  // @BelongsTo(()=>OrderModel,{
  //     foreignKey:'orderId'
  // })
  @Column({
    type: BIGINT,
    allowNull: false,
    comment: "订单id"
  })
  orderId!: number;

  @Column({
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    comment: "订单项id"
  })
  orderItemId!: string;

  @Column({
    type: UUID,
    allowNull: false,
    comment: "商品id"
  })
  goodId!: string;

  @Column({
    type: DOUBLE,
    allowNull: false,
    comment: "商品价格"
  })
  price!: number;

  @Column({
    type: INTEGER,
    allowNull: false,
    comment: "商品数量"
  })
  number!: number;
  @Column({
    type: STRING(20),
    allowNull: false,
    comment: "商品名"
  })
  goodName!: string;
  @Column({
    type: JSON,
    allowNull: false,
    comment: "商品图片"
  })
  imgs!: string;
  @Column({
    type: TEXT,
    allowNull: true,
    comment: "描述"
  })
  desction!: string;
}
