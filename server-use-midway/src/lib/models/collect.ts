import { providerWrapper } from "midway";
import {
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  Model,
  Scopes,
  Table
} from "sequelize-typescript";
const { INTEGER, UUID, BOOLEAN, STRING, JSON, TEXT } = DataType;
export const factory = () => CollectModel;
providerWrapper([
  {
    id: "CollectModel",
    provider: factory
  }
]);
export type ICollectModel = typeof CollectModel;

@Scopes({
  avaliable: {
    where: { status: 1 }
  }
})
@Table({
  freezeTableName: true,
  tableName: "collect"
})
export class CollectModel extends Model<CollectModel> {
  @Column({
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: INTEGER,
    allowNull: false,
    comment: "用户id"
  })
  userId!: number;

  @Column({
    type: UUID,
    allowNull: false
  })
  goodId!: string;

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

  @Column({
    type: BOOLEAN,
    allowNull: false,
    comment: "收藏商品标识"
  })
  isCollect!: boolean;

  @CreatedAt
  @Column({
    field: "created_at"
  })
  created_at!: Date;

  @UpdatedAt
  @Column({
    field: "updated_at"
  })
  updated_at!: Date;
}
