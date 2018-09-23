import xhr from './xhr'
import event from 'utils/event'
import store from 'store'
import Cookies from 'js-cookie'
const option_default = {
    ifLoadingShow: true,
    loadingText: '加载中……'
}
export default class ServerClinet {
    constructor(host) {
        //api主机
        this.host = host

    }
    get(url, obj = { query: {} }) {
        if (!obj.option) {
            obj.option = option_default
        } else {
            obj.option = Object.assign({}, option_default, obj.option)
        }
        if (obj.option.ifLoadingShow) {
            //显示loading
            $showLoading.call(null)
        }
        if (!obj.query.token) {
            obj.query.token = Cookies.get('token')
        }
        return xhr.get(this.host + url, obj)
    }
    post(url, obj) {
        if (!obj.option) {
            obj.option = option_default
        } else {
            obj.option = Object.assign({}, option_default, obj.option)
        }
        if (obj.option.ifLoadingShow) {
            //显示loading
            $showLoading.call(null)
        }
        if (!obj.query.token) {
            obj.query.token = Cookies.get('token')
        }
        return xhr.post(this.host + url, obj)
    }
    put(url, obj = { query: {} }) {
        if (!obj.option) {
            obj.option = option_default
        } else {
            obj.option = Object.assign({}, option_default, obj.option)
        }
        if (obj.option.ifLoadingShow) {
            //显示loading
            $showLoading.call(null)
        }
        if (!obj.query.token) {
            obj.query.token = Cookies.get('token')
        }
        return xhr.put(this.host + url, obj)
    }
}
