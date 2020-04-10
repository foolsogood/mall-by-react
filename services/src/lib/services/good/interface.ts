export interface IInsertGood{
    cate:string
    cateId:string
    goodName:string
    desction?:string
    price:number
    isHot?:boolean
    isNew?:boolean
    imgs:string
    detailImg?:string
}
export interface ISearchGood{
    keyword:string
    // pageSize?:string
    // pageNum?:string
}