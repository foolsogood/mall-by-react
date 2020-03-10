import { inject, provide } from 'midway'
import { IGoodModel } from '../../models/good'
import { IInsertGood } from './interface'

export interface IGoodService extends GoodService { }

@provide()
export class GoodService {
    @inject()
    private GoodModel!: IGoodModel

    async detail(goodId:  string) {
        return await this.GoodModel.findOne({
            where: {
                goodId: goodId
            }
        })
    }

    async listByCateId(cateId:  string) {
        return await this.GoodModel.findAndCountAll({
            where: {
                cateId: cateId
            }
        })
    }

    async add(data: IInsertGood) {
        console.log(data)
        return await this.GoodModel.create(data);
    }
    async del(goodId:  string) {
        return await this.GoodModel.destroy({
            where: {
                goodId: goodId
            }
        });
    }
}