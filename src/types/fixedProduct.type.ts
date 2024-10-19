import IProductDocument from "./product.type"

export default interface IFixedProductDocument extends IProductDocument {
    price: number
    stock: number
    createdAt: Date
    updatedAt: Date
}
