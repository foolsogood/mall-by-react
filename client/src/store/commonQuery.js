import { observable, action } from 'mobx'
class commonQuery {
    @observable loading = {
        isLoadingShow: false,
        loadingTxt: '加载中……'
    }
    @action setLoading = (isLoadingShow, loadingTxt) => {
        this.loading = {
            isLoadingShow, loadingTxt
        }
    }

}

export default new commonQuery()

