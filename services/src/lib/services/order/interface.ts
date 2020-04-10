export interface IQueryOrder {
  userId: number;
  pageSize?: string;
  pageNum?: string;
}
export interface IInsertOrder {
  orderId: number;
  userId: number;
}
export interface IUpdateOrder {
  orderId: number;
  userId: number;
  status?: number;
}
export interface IInsertOrderItem {
  orderId: number;
  goodId: number;
  price: number;
  number: number;
  goodName:string
  desction:string
  imgs:string

}

// export interface IOrderList {
//     // list:List,
//     // OrderModel
//     assign<T,U>(target:T,source:U[]):T&U[]
// }
// export function mergeOrderList<OrderModel, List>(o: OrderModel, oIArr: List): OrderModel & { list: List } {
//     return {
//         ...o,
//         list: oIArr
//     }
// }
