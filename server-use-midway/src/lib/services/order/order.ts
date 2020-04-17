import { inject, provide } from "midway";
import { IOrderModel, OrderModel } from "@models/order";
import { OrderItemModel } from "@models/orderItem";

import { IOrderItemService } from "./orderItem";

import { IInsertOrder, IQueryOrder } from "./interface";
import { formatTime } from "../../utils/tool";
export interface IOrderService extends OrderService {}

@provide()
export class OrderService {
  @inject()
  private OrderModel!: IOrderModel;
  @inject()
  orderItemService: IOrderItemService;

  async list({ userId, pageNum = "1", pageSize = "10" }: IQueryOrder) {
    const o = await this.OrderModel.findAndCountAll({
      raw: true,
      where: {
        userId: userId
      },
      limit: Number(pageSize),
      offset: Number(pageNum) - 1
    });
    console.log(o);
    type IOrderItemWithList = OrderModel & { list: OrderItemModel[] };
    const promiseArr = [];
    console.time("load");
    for (const item of o.rows) {
      const { orderId } = item;
      const res = this.orderItemService.list(orderId);
      promiseArr.push(res);
    }
    const arr = await Promise.all(promiseArr);
    const orderList = [];
    for (let i = 0; i < o.rows.length; i++) {
      const obj = {
        ...o.rows[i],
        list: []
      } as IOrderItemWithList;
      obj.list = arr[i];
      orderList.push(obj);
    }
    console.timeEnd("load");
    return {
      count: o.count,
      orderList
    };
  }
  async createOrderId() {
    // 随机生成N位数字
    const randomNum = len =>
      Math.random()
        .toString()
        .substr(2, len);
    const t = formatTime(new Date(), "timeNumber");
    const a = randomNum(4);
    return Number("" + t + a);
  }

  async add(data: IInsertOrder) {
    return await this.OrderModel.create(data);
  }
  async del(orderId: string) {
    return await this.OrderModel.destroy({
      where: {
        orderId: orderId
      }
    });
  }
  async detail(orderId: string) {
    const o = await this.OrderModel.findOne({
      where: {
        orderId: orderId
      }
    });
    const d = o.get({ plain: true });
    const list = await this.orderItemService.list(Number(orderId));
    return {
      ...d,
      list
    };
  }
}
