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
const { STRING, INTEGER, UUID, UUIDV4, JSON, TEXT, DOUBLE, TINYINT } = DataType;
export const factory = () => CommentModel;
providerWrapper([
  {
    id: "CommentModel",
    provider: factory
  }
]);
export type ICommentModel = typeof CommentModel;

@Scopes({
  avaliable: {
    where: { status: 1 }
  }
})
@Table({
  freezeTableName: true,
  tableName: "comment"
})
export class CommentModel extends Model<CommentModel> {
  @Column({
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    comment: "评论id"
  })
  commentId!: string;

  @Column({
    type: UUID,
    comment: "商品id"
  })
  goodId!: string;

  @Column({
    type: STRING(500),
    comment: "头像"
  })
  avatar!: string;

  @Column({
    type: STRING(20),
    comment: "评论人姓名"
  })
  name!: string;

  @Column({
    type: DOUBLE,
    comment: "评分"
  })
  rateScore!: number;

  @Column({
    type: JSON,
    allowNull: true,
    comment: "评论图片"
  })
  imgList!: string;

  @Column({
    type: TEXT,
    comment: "评论"
  })
  comment!: string;

  @Column({
    type: TINYINT,
    comment: "是否匿名 1是0否",
    allowNull: true,
    defaultValue: 0
  })
  isAnonymous!: number;

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
