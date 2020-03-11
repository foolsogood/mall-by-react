import { providerWrapper } from 'midway'
import { Column, CreatedAt, UpdatedAt, DataType, Model, Scopes, Table } from 'sequelize-typescript'
const { INTEGER, UUID, BOOLEAN } = DataType;
export const factory = () => CollectModel
providerWrapper([
    {
        id: 'CollectModel',
        provider: factory
    }
])
export type ICollectModel = typeof CollectModel

@Scopes({
    avaliable: {
        where: { status: 1 }
    }
})
@Table({
    freezeTableName: true,
    tableName: 'collect'
})
export class CollectModel extends Model<CollectModel>{
    @Column({
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    })
    userId!: number;

    @Column({
        type: UUID,
        allowNull: false,
    })
    goodId!: string;

    @Column({
        type: BOOLEAN,
        allowNull: false,
        comment: '收藏商品标识'
    })
    isCollect!: boolean;

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
