import { extendObservable } from 'mobx'
class user {
    constructor() {
        extendObservable(this, {
            // *观察数据
            //用户
            user: localStorage.getItem('user')
                ? JSON.parse(localStorage.getItem('user'))
                : null,


        });
        //*action
        this.getUser = (user) => {
            this.user = user
            localStorage.setItem('user', JSON.stringify(user))
        };


    }
}

export default new user()

