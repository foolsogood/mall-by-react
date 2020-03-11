import { provide, scope, ScopeEnum } from "midway";
import { Sequelize } from "sequelize-typescript";
import { BannerModel } from './banner'
import { CategoryModel } from './category'
import { GoodModel } from './good'
import { CommentModel } from './comment'
import { UserModel } from './user'
import { CollectModel } from './collect'





import { mock } from '../../../database/data'

// interface ISequelizeCon{
//     host: string;
//     port: string;
//     user: string;
//     password: string;
//     database: string;
//     dialect: string;
// }

@scope(ScopeEnum.Singleton)
@provide("DB")
export class DB {
    static sequelize: Sequelize
    static async initDB(conf: any) {
        // const { database, user, password, port, host, dialect } = conf;
        DB.sequelize = new Sequelize(
            {
                database: conf.database,
                username: conf.user,
                password: conf.password,
                dialect: conf.dialect,
                host: conf.host,
                port: conf.port,
                timezone: "+8:00",
                logging: false,
                operatorsAliases: false
            });
        await DB.sequelize.addModels([BannerModel, CategoryModel, GoodModel, CommentModel, UserModel, CollectModel]);
        // 初始化时候插入mock数据
        mock.banner.forEach(item => {
            BannerModel.sync({ force: false }).then(async () => {
                const flag = await BannerModel.findOne({
                    where: {
                        url: item.url
                    }
                })
                if (!flag) {
                    BannerModel.create(item)
                }
            })
        })
        mock.category.forEach(item => {
            CategoryModel.sync({ force: false }).then(async () => {
                const flag = await CategoryModel.findOne({
                    where: {
                        cateId: item.cateId
                    }
                })
                if (!flag) {
                    CategoryModel.create(item)
                }
            })
        })
        mock.goods.forEach(item => {
            GoodModel.sync({ force: true }).then(async () => {
                const flag = await GoodModel.findOne({
                    where: {
                        goodId: item.goodId
                    }
                })
                if (!flag) {
                    GoodModel.create(item)
                }
            })
        })

        mock.comments.forEach(item => {
            CommentModel.sync({ force: false }).then(async () => {
                const flag = await CommentModel.findOne({
                    where: {
                        commentId: item.commentId
                    }
                })
                if (!flag) {
                    CommentModel.create(item)
                }
            })
        })
        UserModel.sync({ force: false }).then(async () => {
            console.log('table user create success')
        }).catch(err => {
            console.log('table user create fail')
        })
        CollectModel.sync({ force: false }).then(async () => {
            console.log('table collect create success')
        }).catch(err => {
            console.log('table collect create fail')
        })

        try {
            await DB.sequelize.authenticate()
        } catch (err) {
            throw err;
        }
    }
}
