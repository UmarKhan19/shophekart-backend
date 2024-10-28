/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import { FixedProduct } from "../../models"
import { TCreateOrder } from "../../validation/order/create.order.validation"
import responseMessage from "../../constants/responseMessage"
import { createOrderService } from "../../services/order"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const createOrder = asyncHandler(async (req: Request<{}, {}, TCreateOrder["body"]>, res: Response, next: NextFunction) => {
    const { buyerId, deliveryBy, productId, shippingPrice, productIdOnChain,shippingAddress } = req.body

    const product = await FixedProduct.findById(productId)

    if (!product) {
        httpError(next, new Error(responseMessage.NOT_FOUND("Product")), req, 404)
        return
    }
    if (product.stock <= 0) {
        product.status = "out of stock"
        await product.save()
        product.httpError(next, new Error(responseMessage.NOT_FOUND("Stock")), req, 400) // Assuming you have an OUT_OF_STOCK message
        return
    }
    const order = await createOrderService({
        buyerId,
        deliveryBy,
        productId,
        shippingPrice,
        productIdOnChain,
        shippingAddress,

        soldAtPrice: product.price ?? 0
    })
    product.stock -= 1
console.log(2323)
    // Save the updated product
    await product.save()
    httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Order"), order)
    return
})

export default createOrder
