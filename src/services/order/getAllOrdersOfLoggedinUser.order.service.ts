import { Document, Types } from "mongoose"
import { Order } from "../../models"
import { TOrder } from "../../types"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export default async function getAllOrdersOfLoggedinUserService(userId: Types.ObjectId): Promise<(Document<unknown, {}, TOrder> & TOrder)[]> {
    const orders = await Order.find({ buyerId: userId })

    return orders
}
