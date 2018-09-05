import store from 'store'
const middleware = {
    //ajax预处理
    preAjaxHandler() {
        return function (response) {
            //TODO token失效1000 暂未特殊处理 @fsg 2018.9.5
            if ([1, '1','1000'].includes(response.code)) {
                //loading消失
                store.commonQuery.setLoading(false)
                return Promise.resolve(response)
            } else {
                return Promise.reject(response)
            }
        }
    },
    //ajax错误处理
    commonErrorHandler(url) {
        return function (errorMsg) {
            console.error(`url:${url},${errorMsg}`)
        }
    }
}
export default middleware