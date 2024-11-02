import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import { Types } from "mongoose"
import responseMessage from "../../constants/responseMessage"
import { getSingleOrderService } from "../../services/order"
import { TGetSingleOrder } from "../../validation/order/getSingle.order.validation"
import { IMySessionData } from "../../types"

const getSingleOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params as TGetSingleOrder["params"]

    const mySession = req.session as IMySessionData

    if (!mySession.userId) {
        httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
        return
    }

    const order = await getSingleOrderService(new Types.ObjectId(orderId), mySession.userId)

    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Single order"), order)
})

export default getSingleOrder
