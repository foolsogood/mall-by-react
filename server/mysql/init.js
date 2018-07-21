const { createTable, addCategory, addGood, addBanner, addComment } = require('./mysql')
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '..', 'mysql/mockData.json')
//读取json文件数据
const _readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const category = `create table if not exists category(
    id INT NOT NULL AUTO_INCREMENT,
    cate VARCHAR(100) NOT NULL,
    cateId VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);`
const goods = `create table if not exists goods(
    id INT NOT NULL AUTO_INCREMENT,
    cate VARCHAR(40) NOT NULL,
    cateId VARCHAR(100) NOT NULL,
    goodId VARCHAR(100) NOT NULL,
    goodName VARCHAR(100) NOT NULL,
    desction TEXT NOT NULL,
    imgs VARCHAR(5000) NOT NULL,
    detailImg VARCHAR(5000) NOT NULL,
    price VARCHAR(40) NOT NULL,
    isNew TINYINT NOT NULL,
    isHot TINYINT NOT NULL,
    PRIMARY KEY (id)
);`
const banner = `create table if not exists banner(
    id INT NOT NULL AUTO_INCREMENT,
    imgId VARCHAR(100) NOT NULL,
    url VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);`

const comments = `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    goodId VARCHAR(100) NOT NULL,
    avatar VARCHAR(200) NOT NULL,
    name VARCHAR(40) NOT NULL,
    rateScore VARCHAR(10) NOT NULL,
    comment TEXT(100) NOT NULL,
    time VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);`
const order = `create table if not exists orders(
    id INT NOT NULL AUTO_INCREMENT,
    orderId VARCHAR(100) NOT NULL,
    userid VARCHAR(100) NOT NULL,
    status VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);`
const order_item=`create table if not exists order_item(
    id INT NOT NULL AUTO_INCREMENT,
    orderId VARCHAR(100) NOT NULL,
    goodId VARCHAR(100) NOT NULL,
    price VARCHAR(40) NOT NULL,
    number VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);`
const user = `create table if not exists user(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(40) NOT NULL,
    userid VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(200) DEFAULT '',
    phone VARCHAR(40) DEFAULT '',
    PRIMARY KEY (id)
);`
//init 数据库数据
const _initTable = async () => {
    //这两个表不需要初始化数据ß
    createTable(order)
    createTable(order_item)
    createTable(user)
    //这四个表要插入数据所以要保证先建成功
    await createTable(category)
    await createTable(goods)
    await createTable(banner)
    await createTable(comments)
    //获取json文件数据
    let res = await _readFile(filePath)
    res = res.toString()
    res = JSON.parse(res)
    //向四个表插入数据
    res.category.map(item => {
        const { cate, cateId } = item
        addCategory([cate, cateId])
    })
    res.goods.map(item => {
        let { cate, cateId, goodId, goodName, desction, imgs, detailImg, price, isHot, isNew } = item
        //将数组序列化再存储
        imgs = JSON.stringify(imgs)
        detailImg = JSON.stringify(detailImg)
        addGood([cate, cateId, goodId, goodName, desction, imgs, detailImg, price, isHot, isNew])
    })
    res.comments.map(item => {
        const { goodId, avatar, name, rateScore, comment, time } = item
        addComment([goodId, avatar, name, rateScore, comment, time])
    })
    res.banner.map(item => {
        const { imgId, url } = item
        addBanner([imgId, url])
    })
}

_initTable()

