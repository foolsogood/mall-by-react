import { provide, scope, ScopeEnum } from "midway";
import { Sequelize } from "sequelize-typescript";
import { BannerModel } from './banner'
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
        await DB.sequelize.addModels([BannerModel]);
        // 初始化时候插入mock数据
        mock.banner.forEach(item => {
            BannerModel.sync({ force: true }).then(() => {
                BannerModel.create(item)
            })
        })

        try {
            await DB.sequelize.authenticate()
        } catch (err) {
            throw err;
        }
    }
}
