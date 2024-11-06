import { Document, Types } from "mongoose"
import { ORDER_STATUS } from "../../constants/application"
import { TOrder } from "../../types"
import { Order } from "../../models"
import responseMessage from "../../constants/responseMessage"
import getSingleProduct from "../product/getSingleProduct.product.service"
import IFixedProductDocument from "../../types/fixedProduct.type"

export default async function updateOrderStatusService(
    orderId: Types.ObjectId,
    status: ORDER_STATUS
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
): Promise<(Document<unknown, {}, TOrder> & TOrder) | null> {
    const order = await Order.findById(orderId)

    if (!order) throw new Error(responseMessage.NOT_FOUND("Order"))

    const product = (await getSingleProduct(order.productId.toString())) as IFixedProductDocument

    if (!product) throw new Error(responseMessage.NOT_FOUND("Product"))

    order.orderStatus = status

    if (status === ORDER_STATUS.CANCEL) {
        product.stock += 1
    }

    await order.save()

    return order
}
