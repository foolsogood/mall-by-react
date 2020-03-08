import {inject,provide} from 'midway'
import {IBannerModel} from '../../models/banner'
// import {IqueryBannerList} from './interface'

export interface IBannerService extends BannerService{}

@provide()
export class BannerService{
    @inject()
    private BannerModel!: IBannerModel

    async bannerList(){
        return await this.BannerModel.findAll()
    }
}