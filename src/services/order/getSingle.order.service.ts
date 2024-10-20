import { Types } from "mongoose"
import { Order } from "../../models"
import responseMessage from "../../constants/responseMessage"

export default async function getSingleOrderService(orderId: Types.ObjectId) {
    const order = await Order.findById(orderId)

    if (!order) throw new Error(responseMessage.NOT_FOUND("Order"))

    return order
}
