import { Types } from "mongoose"
import { Product } from "../../models"

export default async function updateProductOnChainIdService(productId: Types.ObjectId, onChainId: number) {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { productIdOnChain: onChainId })

    return updatedProduct
}
