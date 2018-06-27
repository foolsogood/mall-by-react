import shopCart from './shopCart'
// 这里是結算的数据
import { extendObservable } from 'mobx'
class Balance {
    constructor() {
        extendObservable(this, {
            balance: this.balanceNum === shopCart.changeNum
                ? (localStorage.getItem('cart')
                    ? JSON.parse(localStorage.getItem('cart'))
                    : {})
                : (sessionStorage.getItem('balance')
                    ? JSON.parse(sessionStorage.getItem('balance'))
                    : {}),

            get balanceNum() {
                let totalNum = 0
                for (let i in this.balance) {
                    totalNum = totalNum + this.balance[i].number
                }
                if (totalNum === 0) {
                    sessionStorage.removeItem('balance')
                }
                return totalNum
            },
            get balancePrice() {
                let totalPrice = 0
                for (let i in this.balance) {
                    totalPrice = totalPrice + this.balance[i].number * this.balance[i].price
                }
                return totalPrice
            }
        });

        this.addToBalance = (goodId, goodInfo) => {
            let balance = JSON.parse(sessionStorage.getItem('balance'))
            if (balance) {
                if (Object.keys(balance).findIndex(item => item === goodId) !== -1) {
                    // console.log('结算有该商品')
                    balance[goodId].number += 1
                } else {
                    // console.log('结算无该商品')
                    balance[goodId] = goodInfo
                    balance[goodId].number = 1
                }

                sessionStorage.setItem('balance', JSON.stringify(balance))
            } else {
                let obj = {}
                obj[goodId] = goodInfo
                obj[goodId].number = 1
                sessionStorage.setItem('balance', JSON.stringify(obj))

            }
            //这里是将mobx中的数据和sessionStorage数据同步
            this.balance = JSON.parse(sessionStorage.getItem('balance'))
        };
        this.changeBalanceNum = (goodId, way) => {
            //这里是操作结算的数据
            if (sessionStorage.getItem('balance')) {
                let balance = this.balance
                //执行购物车的 + 按钮操作,如果该商品在没有加入结算的情况下+，-都不会影响结算的数据
                if (balance[goodId]) {
                    if (way > 0) {
                        balance[goodId].number += 1
                    } else if (way < 0) {

                        //执行购物车的 - 按钮操作
                        balance[goodId].number -= 1
                        if (balance[goodId].number === 0) {
                            delete balance[goodId]
                        }
                    }
                    sessionStorage.setItem('balance', JSON.stringify(balance))
                    this.balance = JSON.parse(sessionStorage.getItem('balance'))
                }
            }
        };

        // 是否将该商品移出结算外
        this.popThisFromBalance = (goodId, bool) => {
            let cart = JSON.parse(localStorage.getItem('cart'))
            //如果没有sessionStorage数据，说明是默认全选购物车的
            if (!sessionStorage.getItem('balance')) {
                sessionStorage.setItem('balance', JSON.stringify(cart))
                this.balance = JSON.parse(sessionStorage.getItem('balance'))
            }
            let balance = this.balance
            //要移除出结算
            if (bool) {
                delete balance[goodId]
            } else {
                //把该商品加入结算
                balance[goodId] = cart[goodId]
            }
            sessionStorage.setItem('balance', JSON.stringify(balance))
            this.balance = JSON.parse(sessionStorage.getItem('balance'))
        };

    }
}
let balance1 = new Balance()
export default balance1