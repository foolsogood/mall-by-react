const koa = require('koa');
const app = new koa();
const staticServer = require('koa-static');
const path = require('path')
const cors = require('koa-cors');
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser');
const model = require('./routers')
const port=require('./config/config').port
app.use(logger())
    .use(staticServer(path.join(__dirname, 'static')))
    .use(cors())
    .use(bodyParser())
Object.values(model).forEach(item => {
    app.use(item.routes())
    app.use(item.allowedMethods())
})
app.on('error',(err,ctx)=>{
    throw err
})
app.listen(port)
console.log('server running at http://localhost:'+port)
