import { extendObservable } from 'mobx'
class commonQuery {
    constructor() {
        extendObservable(this, {
            // *观察数据
            loading: {
                isLoadingShow: true,
                loadingTxt: '加载中……'
            }


        });
        //*action
        this.setLoading = (isLoadingShow, loadingTxt) => {
            this.loading = {
                isLoadingShow, loadingTxt
            }
        };


    }
}

export default new commonQuery()

