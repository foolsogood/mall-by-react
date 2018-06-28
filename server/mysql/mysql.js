let mysql = require('mysql');
const config = require('../config/config')
let pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})
let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}
let createTable = (sql) => {
    return query(sql, [])
}


let addCategory = (value) => {
    let _sql = `INSERT INTO category(cate,cateId) values(?,?);`
    return query(_sql, value)
}
let addGood = (value) => {
    let _sql = `INSERT INTO goods(cate,cateId,goodId,goodName,desc,imgs,detailImg,price,) values(?,?,?,?,?,?,?,?);`
    return query(_sql, value)
}
let addBanner = (value) => {
    let _sql = `INSERT INTO banner(imgId,url) values(?,?);`
    return query(_sql, value)
}
let addComment = (value) => {
    let _sql = `INSERT INTO comments(goodId,avatar,name,rateScore,comment,time) values(?,?,?,?,?,?);`
    return query(_sql, value)
}
module.exports = {
    createTable,
    addCategory,
    addGood,
    addBanner,
    addComment
}