import { Types } from "mongoose"
import { Order } from "../../models"

export default async function deleteOrderService(orderId: Types.ObjectId) {
    const order = await Order.findByIdAndDelete(orderId)

    return order
}
