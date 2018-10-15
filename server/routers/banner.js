const router = require('koa-router')();
const model = require('../mysql/mysql')
const etag=require('etag');
const { success, fail, tokenInvalid } = require('../config/config').codeOption

router.prefix('/api/banner')
router.get('/getHomeBanner', async (ctx) => {
    await model.getHomeBanner().then(res => {
        const ifNoneMatch = ctx.get('if-none-match')
        const _ETAG=etag(JSON.stringify(res))
        ctx.set({
            'Cache-Control': 'max-age=30,no-cache',
            'ETag': _ETAG
        })
        if (ifNoneMatch == _ETAG) {
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