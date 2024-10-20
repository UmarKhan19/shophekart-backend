import responseMessage from "../../constants/responseMessage"
import { Order } from "../../models"
import { TCreateOrder } from "../../validation/order/create.order.validation"

export default async function ({
    buyerId,
    deliveryBy,
    productId,
    shippingPrice,
    productIdOnChain,
    tokenId,
    soldAtPrice
}: TCreateOrder["body"] & { soldAtPrice: number }) {
    const order = await Order.create({
        buyerId,
        deliveryBy,
        orderStatus: "pending",
        productId,
        productIdOnChain,
        shippingPrice,
        soldAtPrice,
        tokenId
    })

    if (!order) throw new Error(responseMessage.OPERATION_FAILED("Order creation"))

    return order
}
