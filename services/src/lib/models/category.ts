import { providerWrapper } from 'midway'
import { Column, CreatedAt, UpdatedAt, DataType, Model, Scopes, Table } from 'sequelize-typescript'
const { STRING, INTEGER, UUID ,UUIDV4} = DataType;
export const factory = () => CategoryModel
providerWrapper([
    {
        id: 'CategoryModel',
        provider: factory
    }
])
export type ICategoryModel = typeof CategoryModel

@Scopes({
    avaliable: {
        where: { status: 1 }
    }
})
@Table({
    freezeTableName: true,
    tableName: 'category'
})
export class CategoryModel extends Model<CategoryModel>{
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
