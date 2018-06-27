const router = require('koa-router')();
const model = require('../mysql/mysql')
const checkToken = require('../tools/checkToken')

router.prefix('/api/book')
router.get('/getAllBook', async (ctx) => {
    if (!checkToken(ctx)) {
        return
    }
    await model.getAllBook().then(res => {
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
router.get('/getBookDetail', async (ctx) => {
    if (!checkToken(ctx)) {
        return
    }
    
    const { bookId } = ctx.request.query
    await model.getBookDetail(bookId).then(res => {
        ctx.body = {
            code: '1',
            data: res
        }
    })
})
router.delete('/removeBook', async (ctx) => {
    const { bookId } = ctx.request.body
    await model.removeBook(bookId).then(res => {
        ctx.body = {
            code: '1',
            msg: 'success'
        }
    }).catch(err=>{
        ctx.body={code:0,msg:'fail'}
    })
})
router.put('/addBook', async (ctx) => {
    const { bookName, author, price } = ctx.request.body
    await model.insertBook([bookName, author, price]).then(res => {
        ctx.body = {
            code: '1',
            msg: 'success'
        }
    }).catch(err => {
        ctx.body = {
            code: '0',
            msg: 'fail'
        }
    })
})
module.exports = router
