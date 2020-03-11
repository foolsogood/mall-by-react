import { inject, provide } from 'midway'
import { ICollectModel } from '../../models/collect'
import { IToggleCollect, IIsCollect } from './interface'

export interface ICollectService extends CollectService { }

@provide()
export class CollectService {
    @inject()
    private CollectModel!: ICollectModel

    async list(userId: number | string) {
        return await this.CollectModel.findAndCountAll(
            {
                where: {
                    userId: Number(userId)
                }
            }
        )
    }

    async toggle(data: IToggleCollect) {
        console.log(data)
        const flag = await this.CollectModel.findOne({
            where: {
                userId: Number(data.userId),
                goodId: data.goodId
            }
        })
        if (flag) {
            const c = flag.get({ plain: true })
            console.log('c', c)
            if (Reflect.has(data, 'isCollect')) {
                c.isCollect = Reflect.get(data, 'isCollect')
            } else {
                c.isCollect = !c.isCollect
            }
            return await this.CollectModel.update({
                isCollect: c.isCollect
            }, {
                where: {
                    id: c.id
                }
            });
        } else {
            return await this.CollectModel.create(data)
        }
    }
    async isCollect(data: IIsCollect) {
        console.log(data)
        const flag = await this.CollectModel.findOne({
            where: {
                userId: Number(data.userId),
                goodId: data.goodId,
                isCollect: true
            }
        });
        return Boolean(flag);
    }
    async del(id: number | string) {
        return await this.CollectModel.destroy({
            where: {
                id: Number(id)
            }
        });
    }
}