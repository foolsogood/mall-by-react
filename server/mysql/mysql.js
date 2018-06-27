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
let book = `create table if not exists book(
    id INT NOT NULL AUTO_INCREMENT,
    bookName VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    price VARCHAR(40) NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
);`
let userInfo=`create table if not exists userInfo(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);`
createTable(book)
createTable(userInfo)
let getAllBook = () => {
    let _sql = `SELECT * FROM book`
    return query(_sql)
}
let getBookDetail = (bookId) => {
    let _sql = `SELECT * FROM book where id="${bookId}"`
    return query(_sql, [])
}
let removeBook = (bookId) => {
    let _sql = `DELETE  FROM book where id="${bookId}"`
    return query(_sql)
}
let insertBook = (value) => {
    let _sql = `INSERT INTO book(bookName,author,price) values(?,?,?);`
    return query(_sql, value)
}
let signup=(value)=>{
    let _sql=`INSERT INTO userInfo(username,password,email) values(?,?,?)`
    return query(_sql,value)
}
let checkLogin=(username)=>{
   let _sql=`SELECT * FROM userInfo where username="${username}"`
   return query(_sql,username)
}
module.exports = {
    getAllBook,
    getBookDetail,
    removeBook,
    insertBook,
    signup,
    checkLogin
}