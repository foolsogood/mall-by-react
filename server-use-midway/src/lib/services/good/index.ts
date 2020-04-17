import { inject, provide } from "midway";
import { IGoodModel } from "../../models/good";
import { IInsertGood } from "./interface";
const Sequelize = require('sequelize');
const Op = Sequelize.Op


export interface IGoodService extends GoodService {}

@provide()
export class GoodService {
  @inject()
  private GoodModel!: IGoodModel;

  async detail(goodId: string) {
    return await this.GoodModel.findOne({
      where: {
        goodId: goodId
      }
    });
  }

  async hot() {
    return await this.GoodModel.findAndCountAll({
      where: {
        isHot: true
      },
      limit: 6,
      offset: 0
    });
  }
  
  async new() {
    return await this.GoodModel.findAndCountAll({
      where: {
        isNew: true
      },
      limit: 6,
      offset: 0
    });
  }

  async searchGood(keyword:string) {
    return await this.GoodModel.findAndCountAll({
      where: {
        goodName:{
          [Op.like]:`%${keyword}%`
        }
      },
      limit: 6,
      offset: 0
    });
  }

  async listByCateId(cateId: string) {
    return await this.GoodModel.findAndCountAll({
      where: {
        cateId: cateId
      }
    });
  }

  async add(data: IInsertGood) {
    console.log(data);
    return await this.GoodModel.create(data);
  }
  async del(goodId: string) {
    return await this.GoodModel.destroy({
      where: {
        goodId: goodId
      }
    });
  }
}
