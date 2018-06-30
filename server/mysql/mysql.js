const mysql = require('mysql');
const config = require('../config/config')
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})
const query = (sql, values) => {
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
const createTable = (sql) => {
    return query(sql, [])
}


const addCategory = (value) => {
    const _sql = `INSERT INTO category(cate,cateId) values(?,?);`
    return query(_sql, value)
}
const addGood = (value) => {
    const _sql = `INSERT INTO goods(cate,cateId,goodId,goodName,desction,imgs,detailImg,price) values(?,?,?,?,?,?,?,?);`
    return query(_sql, value)
}
const addBanner = (value) => {
    const _sql = `INSERT INTO banner(imgId,url) values(?,?);`
    return query(_sql, value)
}
const addComment = (value) => {
    const _sql = `INSERT INTO comments(goodId,avatar,name,rateScore,comment,time) values(?,?,?,?,?,?);`
    return query(_sql, value)
}
module.exports = {
    createTable,
    addCategory,
    addGood,
    addBanner,
    addComment
}