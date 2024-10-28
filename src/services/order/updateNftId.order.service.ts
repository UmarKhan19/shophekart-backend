import { Types } from "mongoose"
import { Order } from "../../models"

export default async function updateNftIdService(orderId: Types.ObjectId, nftId: number) {
    const order = await Order.findByIdAndUpdate(orderId, { nftId })

    return order
}
