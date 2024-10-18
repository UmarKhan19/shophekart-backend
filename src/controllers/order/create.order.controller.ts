import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import { FixedProduct, Order } from "../../models"
import { TCreateOrder } from "../../validation/order/create.order.validation"
import responseMessage from "../../constants/responseMessage"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const createOrder = asyncHandler(async (req: Request<{}, {}, TCreateOrder["body"]>, res: Response, next: NextFunction) => {
    const { buyerId, deliveryBy, productId, shippingPrice, productIdOnChain, tokenId } = req.body

    const product = await FixedProduct.findById(productId)

    if (!product) {
        httpError(next, new Error(responseMessage.NOT_FOUND("Product")), req, 404)
        return
    }

    const order = await Order.create({
        buyerId,
        deliveryBy,
        orderStatus: "pending",
        productId,
        productIdOnChain,
        shippingPrice,
        soldAtPrice: product.price,
        tokenId
    })

    if (!order) {
        httpError(next, new Error(responseMessage.OPERATION_FAILED("Order creation")), req, 500)
    }

    httpResponse(req, res, 201, responseMessage.SUCCESSFUL_OPERATION("Order creation"), null)
})

export default createOrder
