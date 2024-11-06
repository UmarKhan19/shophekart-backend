import { Types } from "mongoose"
import { FixedProduct } from "../../models"
import IFixedProductDocument from "../../types/fixedProduct.type"

export default async function updateProductStockService({ productId, quantity }: IProps) {
    const product = (await FixedProduct.findByIdAndUpdate(productId, { $inc: { stock: quantity } }, { new: true })) as IFixedProductDocument

    return product
}

type IProps = { productId: Types.ObjectId; quantity: number }
