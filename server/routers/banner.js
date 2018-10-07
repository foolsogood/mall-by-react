const router = require('koa-router')();
const model = require('../mysql/mysql')
const sha1 = require('sha1')

const { success, fail, tokenInvalid } = require('../config/config').codeOption

router.prefix('/api/banner')
router.get('/getHomeBanner', async (ctx) => {
    await model.getHomeBanner().then(res => {
        const ifNoneMatch = ctx.get('if-none-match')
        ctx.set({
            'Cache-Control': 'max-age=30,no-cache',
            'ETag': sha1(res)
        })
        if (ifNoneMatch == sha1(res)) {
            ctx.status = 304
            ctx.body = ''
        } else {

            ctx.body = {
                code: success,
                data: res
            }
        }
    }).catch(err => {
        ctx.body = {
            code: fail,
            msg: err
        }
    })
})
module.exports = router