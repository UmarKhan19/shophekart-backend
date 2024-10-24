import { ORDER_STATUS } from "../../constants/application"
import responseMessage from "../../constants/responseMessage"
import { Order } from "../../models"
import { TCreateOrder } from "../../validation/order/create.order.validation"

export default async function ({
    buyerId,
    deliveryBy,
    productId,
    shippingPrice,
    productIdOnChain,
    soldAtPrice
}: TCreateOrder["body"] & { soldAtPrice: number }) {
    const order = await Order.create({
        buyerId,
        deliveryBy,
        orderStatus: ORDER_STATUS.AWAITING_SHIPMENT,
        productId,
        productIdOnChain,
        shippingPrice,
        soldAtPrice
    })

    if (!order) throw new Error(responseMessage.OPERATION_FAILED("Order creation"))

    return order
}
