import { observable, action } from 'mobx'
class user {
    //用户
    @observable user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    @action getUser = (user) => {
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
    }
}

export default new user()

