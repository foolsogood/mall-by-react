const { createTable, addCategory, addGood, addBanner, addComment } = require('./mysql')
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '..', 'mysql/mockData.json')
let _readFile = (filePath) => {
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

let category = `create table if not exists category(
    id INT NOT NULL AUTO_INCREMENT,
    cate VARCHAR(100) NOT NULL,
    cateId VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);`
let goods = `create table if not exists goods(
    id INT NOT NULL AUTO_INCREMENT,
    cate VARCHAR(40) NOT NULL,
    cateId VARCHAR(100) NOT NULL,
    goodId VARCHAR(100) NOT NULL,
    goodName VARCHAR(100) NOT NULL,
    desction VARCHAR(100) NOT NULL,
    imgs VARCHAR(5000) NOT NULL,
    detailImg VARCHAR(5000) NOT NULL,
    price VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);`
let banner = `create table if not exists banner(
    id INT NOT NULL AUTO_INCREMENT,
    imgId VARCHAR(100) NOT NULL,
    url VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);`

let comments = `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    goodId VARCHAR(100) NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    name VARCHAR(40) NOT NULL,
    rateScore VARCHAR(10) NOT NULL,
    comment VARCHAR(100) NOT NULL,
    time VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);`
let _initTable = async () => {
    await createTable(category)
    await createTable(goods)
    await createTable(banner)
    await createTable(comments)
    let res = await _readFile(filePath)
    res = res.toString()
    res = JSON.parse(res)
    res.category.map(item => {
        const {cate,cateId}=item
        addCategory([cate,cateId])
    })
    res.goods.map(item => {
        let { cate, cateId, goodId, goodName, desction, imgs, detailImg, price } = item
        imgs = imgs.join(',')
        detailImg = detailImg.join(',')
        addGood([cate, cateId, goodId, goodName, desction,imgs, detailImg, price])
    })
    res.comments.map(item => {
        const {goodId,avatar,name,rateScore,comment,time}=item
        addComment([goodId,avatar,name,rateScore,comment,time])
    })
    res.banner.map(item => {
        const {imgId,url}=item
        addBanner([imgId,url])
    })
}

_initTable()

