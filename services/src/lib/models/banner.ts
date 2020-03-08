import { providerWrapper } from 'midway'
import { Column, CreatedAt, UpdatedAt, DataType, Model, Scopes, Table } from 'sequelize-typescript'
const { STRING, INTEGER, UUID ,UUIDV4} = DataType;
export const factory = () => BannerModel
providerWrapper([
    {
        id: 'BannerModel',
        provider: factory
    }
])
export type IBannerModel = typeof BannerModel

@Scopes({
    avaliable: {
        where: { status: 1 }
    }
})
@Table({
    freezeTableName: true,
    tableName: 'banner'
})
export class BannerModel extends Model<BannerModel>{
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
        comment: '图片id'
    })
    imgId!: string;

    @Column({
        type: STRING(1000),
        comment: '图片地址'
    })
    url!: string;

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
