import { Types } from "mongoose"
import { Product } from "../../models"

export default async function getProductsBySellerService(sellerId: Types.ObjectId) {
    return await Product.find({ sellerId })
}
