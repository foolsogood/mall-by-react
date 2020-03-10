import { inject, provide } from 'midway'
import { IBannerModel } from '../../models/banner'
import { IInsertBanner } from './interface'

export interface IBannerService extends BannerService { }

@provide()
export class BannerService {
    @inject()
    private BannerModel!: IBannerModel

    async list() {
        return await this.BannerModel.findAll()
    }

    async add(data: IInsertBanner) {
        console.log(data)
        return await this.BannerModel.create(data);
    }
    async del(id: number | string) {
        return await this.BannerModel.destroy({
            where: {
                id: Number(id)
            }
        });
    }
}