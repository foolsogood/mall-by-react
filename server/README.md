# mall-server

## Development

```bash
# install dependencies
npm install
# start
npm run dev

# generate migration file
npx sequelize migration:generate
# migrate up
npx sequelize db:migrate
# migrate up for test database
NODE_ENV=test npx sequelize db:migrate
# migrate down
npx sequelize db:migrate:down
npx sequelize db:migrate:down:all
# migrate down for test database
NODE_ENV=test npx sequelize db:migrate:down
NODE_ENV=test npx sequelize db:migrate:down:all

# run migration and test, for CI environment
npm run ci
```

## Documents

[eggjs sequelize document](https://eggjs.org/zh-cn/tutorials/mysql.html)
[egg-sequelize](https://github.com/eggjs/egg-sequelize)
[sequelize](http://docs.sequelizejs.com)
[sequelize-cli and migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)
[factory-girl](https://github.com/aexmachina/factory-girl)
