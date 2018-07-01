const router = require('koa-router')();
const model = require('../mysql/mysql')
// const checkToken = require('../tools/checkToken')

router.prefix('/api/good')
router.get('/getAllGoods', async (ctx) => {
    await model.getAllGoods().then(res => {
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

router.get('/getNewGoods', async (ctx) => {
    await model.getNewGoods().then(res => {
        ctx.body = {
            code: '1',
            data: res
        }
    })
})
router.get('/getHotGoods', async (ctx) => {
    await model.getHotGoods().then(res => {
        ctx.body = {
            code: '1',
            data: res
        }
    })
})
router.get('/searchGood', async (ctx) => {
    const { keyword } = ctx.request.query
    if(!keyword){return}
    await model.searchGood(keyword).then(res => {
        ctx.body = {
            code: '1',
            data: res
        }
    })
})
router.get('/getGoodsByCate', async (ctx) => {
    const { cateId } = ctx.request.query
    await model.getGoodsByCate(cateId).then(res => {
        ctx.body = {
            code: '1',
            data: res
        }
    })
})
router.get('/getGoodById', async (ctx) => {
    const { cateId ,goodId} = ctx.request.query
    let comments
    await model.getComment(goodId).then(res=>{
         comments=res
    })
    await model.getGoodById(cateId,goodId).then(res => {
        ctx.body = {
            code: '1',
            data:Object.assign({},res[0],{comments}) 
        }
    })
})
// router.delete('/removeBook', async (ctx) => {
//     const { bookId } = ctx.request.body
//     await model.removeBook(bookId).then(res => {
//         ctx.body = {
//             code: '1',
//             msg: 'success'
//         }
//     }).catch(err=>{
//         ctx.body={code:0,msg:'fail'}
//     })
// })
// router.put('/addGood', async (ctx) => {
//     const { bookName, author, price } = ctx.request.body
//     await model.addGood([bookName, author, price]).then(res => {
//         ctx.body = {
//             code: '1',
//             msg: 'success'
//         }
//     }).catch(err => {
//         ctx.body = {
//             code: '0',
//             msg: 'fail'
//         }
//     })
// })
module.exports = router
