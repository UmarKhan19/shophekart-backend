import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import { Types } from "mongoose"
import responseMessage from "../../constants/responseMessage"
import { getSingleOrderService } from "../../services/order"
import { TGetSingleOrder } from "../../validation/order/getSingle.order.validation"

const getSingleOrder = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params as TGetSingleOrder["params"]

    const order = await getSingleOrderService(new Types.ObjectId(orderId))

    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Single order"), order)
})

export default getSingleOrder
