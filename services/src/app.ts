import { DB } from './lib/models/db'
module.exports = app => {
    app.beforeStart(async () => {
        await DB.initDB(app.config.sequelize);
    })
}