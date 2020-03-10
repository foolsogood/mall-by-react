import { providerWrapper } from 'midway'
import { Column, CreatedAt, UpdatedAt, DataType, Model, Scopes, Table } from 'sequelize-typescript'
const { STRING, INTEGER, UUID ,UUIDV4,TEXT,BOOLEAN,DOUBLE,JSON} = DataType;
export const factory = () => GoodModel
providerWrapper([
    {
        id: 'GoodModel',
        provider: factory
    }
])
export type IGoodModel = typeof GoodModel

@Scopes({
    avaliable: {
        where: { status: 1 }
    }
})
@Table({
    freezeTableName: true,
    tableName: 'good'
})
export class GoodModel extends Model<GoodModel>{
    @Column({
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        comment: '分类id'
    })
    cateId!: string;

    @Column({
        type: STRING(20),
        comment: '分类名'
    })
    cate!: string;

    @Column({
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        comment: '商品id'
    })
    goodId!: string;

    @Column({
        type: STRING(20),
        allowNull: false,
        comment: '商品名'
    })
    goodName!: string;

    @Column({
        type: TEXT,
        allowNull: true,
        comment: '描述'
    })
    desction!: string;

    @Column({
        type: DOUBLE,
        allowNull: false,
        comment: '价格'
    })
    price!: number;

    @Column({
        type: BOOLEAN,
        allowNull: false,
        defaultValue:false,
        comment: '是否热门商品'
    })
    isHot!: boolean;

    @Column({
        type: BOOLEAN,
        allowNull: false,
        defaultValue:false,
        comment: '是否新品'
    })
    isNew!: boolean;

    @Column({
        type: JSON,
        allowNull: false,
        comment: '商品图片'
    })
    imgs!: string;

    @Column({
        type: JSON,
        allowNull: true,
        comment: '商品详情图片'
    })
    detailImg!: string;

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
