const router = require('koa-router')();
const model = require('../mysql/mysql')
const sha1 = require('sha1')
const tools = require('../tools/tools')
const createToken = require('../tools/createToken')

// const checkToken = require('../tools/checkToken')

router.prefix('/api/user')
router.post('/login', async (ctx) => {
    const { username, password } = ctx.body.query
    const userInfo = await model.getUser(username)
    if (!userInfo) {
        return ctx.body = {
            code: '0',
            msg: '无此用户'
        }
    }
    if (userInfo.password !== sha1(password)) {
        return ctx.body = {
            code: '0',
            msg: '密码错误'
        }
    }
    //用户和密码都正确
    ctx.body = {
        code: 1,
        data: userInfo,
        token: createToken({ username })
    }
})
router.put('/signup', async (ctx) => {
    const { username, password, repeatPwd } = ctx.body.query
    if (password !== repeatPwd) {
        return ctx.body = {
            code: '0',
            data: '两次密码不一致'
        }
    }
    const userInfo = await model.getUser(username)
    if (userInfo) {
        return ctx.body = {
            code: '0',
            msg: '已注册'
        }
    }
    await model.signup([username, sha1(password)], tools.guid()).then(res => {
        ctx.body = {
            code: '1',
            data: res
        }
    }).catch(err => {
        ctx.body = {
            code: '0',
            msg: 'err'
        }
    })
})
module.exports = router
