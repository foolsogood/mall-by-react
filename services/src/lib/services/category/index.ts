import { inject, provide } from 'midway'
import { ICategoryModel } from '../../models/category'
import { IInsertCategory } from './interface'

export interface ICategoryService extends CategoryService { }

@provide()
export class CategoryService {
    @inject()
    private CategoryModel!: ICategoryModel

    async list() {
        return await this.CategoryModel.findAll()
    }

    async add(data: IInsertCategory) {
        console.log(data)
        return await this.CategoryModel.create(data);
    }
    async del(id: number | string) {
        return await this.CategoryModel.destroy({
            where: {
                id: Number(id)
            }
        });
    }
}