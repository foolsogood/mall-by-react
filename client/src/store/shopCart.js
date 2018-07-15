import { extendObservable } from 'mobx'
class ShopCart {
    constructor() {
        extendObservable(this, {
            // *观察数据
            // 购物车所有商品
            cart: localStorage.getItem('cart')
                ? JSON.parse(localStorage.getItem('cart'))
                : null,
            //*计算数据
            get cartTotalNum() {
                let initNum = 0
                if (this.cart && Object.values(this.cart).length) {
                    for (let i in this.cart) {
                        if (this.cart[i].isSelect) {
                            initNum = initNum + this.cart[i].number
                        }
                    }
                }

                //购物车为空时清除缓存
                if (initNum === 0) {
                    localStorage.removeItem('cart')
                }
                return initNum
            },
            get cartTotalPrice() {
                let initTotal = 0
                if (this.cart && Object.values(this.cart).length) {
                    for (let i in this.cart) {
                        if (this.cart[i].isSelect) {
                            initTotal = initTotal + this.cart[i].number * this.cart[i].price
                        }
                    }
                }
                return initTotal
            }
        });
        //*action
        // 添加进购物车
        this.addToCart = (goodId, goodInfoObj) => {

            let cart = JSON.parse(localStorage.getItem('cart'))
            if (cart) {
                if (Object.keys(cart).findIndex(item => item === goodId) !== -1) {
                    // console.log('购物车有该商品')
                    cart[goodId].number += 1
                } else {
                    // console.log('购物车无该商品')
                    cart[goodId] = Object.assign(goodInfoObj, { isSelect: true })
                    cart[goodId].number = 1
                }
                localStorage.setItem('cart', JSON.stringify(cart))
            } else {
                let obj = {}
                obj[goodId] = Object.assign(goodInfoObj, { isSelect: true })
                obj[goodId].number = 1
                localStorage.setItem('cart', JSON.stringify(obj))
            }
            //这里是将mobx中的数据和localStorage数据同步
            this.cart = JSON.parse(localStorage.getItem('cart'))
        };
        //改变商品数量
        this.changeNum = (goodId, way) => {
            let cart = JSON.parse(localStorage.getItem('cart'))
            //执行购物车的 + 按钮操作
            if (way > 0) {
                cart[goodId].number += 1
            } else if (way < 0) {
                //执行购物车的 - 按钮操作
                cart[goodId].number -= 1
                if (cart[goodId].number === 0) {
                    delete cart[goodId]
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            this.cart = JSON.parse(localStorage.getItem('cart'))
        };
        //移除商品
        this.removeFromCart = (goodId) => {
            console.log(goodId)
            let cart = JSON.parse(localStorage.getItem('cart'))
            delete cart[goodId]
            localStorage.setItem('cart', JSON.stringify(cart))
            this.cart = JSON.parse(localStorage.getItem('cart'))
        }
        // 是否将该商品移出结算外
        this.popThisFromBalance = (goodId, bool) => {
            let cart = JSON.parse(localStorage.getItem('cart'))
            cart[goodId].isSelect = !bool
            localStorage.setItem('cart', JSON.stringify(cart))
            this.cart = JSON.parse(localStorage.getItem('cart'))

        };

    }
}

let shopCart1 = new ShopCart()
export default shopCart1

