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
// "drop table category if exists"
const category = `create table if not exists category(
    id INT NOT NULL AUTO_INCREMENT,
    cate VARCHAR(100) NOT NULL COMMENT '分类名',
    cateId VARCHAR(100) NOT NULL COMMENT '分类id',
    PRIMARY KEY (id)
);`
// "drop table goods if exists"
const goods = `create table if not exists goods(
    id INT NOT NULL AUTO_INCREMENT,
    cate VARCHAR(40) NOT NULL COMMENT '分类名',
    cateId VARCHAR(100) NOT NULL COMMENT '分类id',
    goodId VARCHAR(100) NOT NULL COMMENT '商品id',
    goodName VARCHAR(100) NOT NULL COMMENT '商品名',
    desction TEXT NOT NULL COMMENT '商品描述',
    imgs VARCHAR(5000) NOT NULL COMMENT '图片',
    detailImg VARCHAR(5000) NOT NULL COMMENT '图片',
    price VARCHAR(40) NOT NULL COMMENT '商品单价',
    isNew TINYINT NOT NULL COMMENT '是否新品1是0否',
    isHot TINYINT NOT NULL COMMENT '是否热卖1是0否',
    PRIMARY KEY (id)
);`
// "drop table banner if exists"
const banner = `create table if not exists banner(
    id INT NOT NULL AUTO_INCREMENT,
    imgId VARCHAR(100) NOT NULL COMMENT '图片id',
    url VARCHAR(100) NOT NULL COMMENT '图片链接',
    PRIMARY KEY (id)
);`
// "drop table comments if exists"
const comments = `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    goodId VARCHAR(100) NOT NULL COMMENT '商品id',
    avatar VARCHAR(200) NOT NULL COMMENT '用户头像',
    name VARCHAR(40) NOT NULL COMMENT '用户名',
    rateScore VARCHAR(10) NOT NULL COMMENT '星级评分',
    comment TEXT(100) NOT NULL COMMENT '留言评论',
    time VARCHAR(40) NOT NULL COMMENT '评论时间',
    PRIMARY KEY (id)
);`
// "drop table orders if exists"
const order = `create table if not exists orders(
    id INT NOT NULL AUTO_INCREMENT,
    orderId VARCHAR(100) NOT NULL COMMENT '订单号',
    userid VARCHAR(100) NOT NULL COMMENT '用户id',
    status VARCHAR(40) NOT NULL COMMENT '订单状态',
    PRIMARY KEY (id)
);`
// "drop table order_item if exists"
const order_item=`create table if not exists order_item(
    id INT NOT NULL AUTO_INCREMENT,
    orderId VARCHAR(100) NOT NULL COMMENT '订单号',
    goodId VARCHAR(100) NOT NULL COMMENT '商品id',
    price VARCHAR(40) NOT NULL COMMENT '商品单价',
    number VARCHAR(40) NOT NULL COMMENT '商品数',
    PRIMARY KEY (id)
);`
// "drop table user if exists"
const user = `create table if not exists user(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(40) NOT NULL COMMENT '用户名',
    userid VARCHAR(100) NOT NULL COMMENT '用户id',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    avatar VARCHAR(200) DEFAULT '' COMMENT '用户头像',
    phone VARCHAR(40) DEFAULT '' COMMENT '手机',
    PRIMARY KEY (id)
);`
//init 数据库数据
const _initTable = async () => {
    //这三个表不需要初始化数据
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
    res.category.forEach(item => {
        const { cate, cateId } = item
        addCategory([cate, cateId])
    })
    res.goods.forEach(item => {
        let { cate, cateId, goodId, goodName, desction, imgs, detailImg, price, isHot, isNew } = item
        //将数组序列化再存储
        imgs = JSON.stringify(imgs)
        detailImg = JSON.stringify(detailImg)
        addGood([cate, cateId, goodId, goodName, desction, imgs, detailImg, price, isHot, isNew])
    })
    res.comments.forEach(item => {
        const { goodId, avatar, name, rateScore, comment, time } = item
        addComment([goodId, avatar, name, rateScore, comment, time])
    })
    res.banner.forEach(item => {
        const { imgId, url } = item
        addBanner([imgId, url])
    })
}

_initTable()

