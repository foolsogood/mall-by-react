import store from 'store'
import event from 'utils/event'

const middleware = {
    //ajax预处理
    preAjaxHandler() {
        return function (response) {
            //TODO token失效1000 暂未特殊处理 @fsg 2018.9.5
            if ([1, '1','1000'].includes(response.code)) {
                //loading消失
                $hideLoading()
                return Promise.resolve(response)
            } else {
                return Promise.reject(response)
            }
        }
    },
    //ajax错误处理
    commonErrorHandler(url) {
        return function (errorMsg) {
            console.error(`url:${url}`)
            throw errorMsg
        }
    },
    //显示loading
    showLoading(txt='加载中……'){
        store.commonQuery.setLoading(true,txt)
        setTimeout(()=>{
            //默认3秒消失
            $hideLoading.call(null)
        },1000*3)
    },
    hideLoading(){
        store.commonQuery.setLoading(false)
    }
}
export default middleware