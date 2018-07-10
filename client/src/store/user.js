import { extendObservable } from 'mobx'
class user {
    constructor() {
        extendObservable(this, {
            // *观察数据
            // 购物车所有商品
            user: localStorage.getItem('user')
                ? JSON.parse(localStorage.getItem('user'))
                : null,


        });
        //*action
        // 添加进购物车
        this.getUser = (user) => {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user))
        };


    }
}

export default new user()

