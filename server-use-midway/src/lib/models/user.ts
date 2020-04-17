import { providerWrapper } from 'midway'
import { Column, CreatedAt, UpdatedAt, DataType, Model, Scopes, Table } from 'sequelize-typescript'
const { STRING, INTEGER } = DataType;
export const factory = () => UserModel
providerWrapper([
    {
        id: 'UserModel',
        provider: factory
    }
])
export type IUserModel = typeof UserModel

@Scopes({
    avaliable: {
        where: { status: 1 }
    }
})
@Table({
    freezeTableName: true,
    tableName: 'user'
})
export class UserModel extends Model<UserModel>{
    @Column({
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    userId!: number;

    // @Column({
    //     type: UUID,
    //     defaultValue: UUIDV4,
    //     allowNull: false,
    // })
    // userId!: string;

    @Column({
        type: STRING(50),
        allowNull: false,
        comment: '用户名'
    })
    username!: string;

    @Column({
        type: STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: STRING(200),
        comment: '头像'
    })
    avatar!: string;

    @Column({
        type: STRING(32),
        allowNull: false,
    })
    phone!: string;

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
