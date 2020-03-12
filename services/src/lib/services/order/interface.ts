export interface IInsertOrder{
    orderId:number
    userId:number
}
export interface IUpdateOrder{
    orderId:number
    userId:number
    status?:number
}
export interface IInsertOrderItem{
    orderId:number
    goodId:number
    price:number
    number:number
}