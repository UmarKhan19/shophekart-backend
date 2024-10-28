/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import { TUpdateNftId } from "../../validation/order/updateNftId.order.validation"
import { updateNftIdService } from "../../services/order"
import { Types } from "mongoose"
import responseMessage from "../../constants/responseMessage"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const updateNftId = asyncHandler(async (req: Request<{}, {}, TUpdateNftId["body"]>, res: Response, next: NextFunction) => {
    const { nftId, orderId } = req.body

    const updatedOrder = await updateNftIdService(new Types.ObjectId(orderId), nftId)

    if (!updateNftId) {
        httpError(next, new Error(responseMessage.NOT_FOUND("Order")), req, 404)
        return
    }

    httpResponse(req, res, 201, responseMessage.UPDATED_SUCCESSFULLY("Order NFT Id"), updatedOrder)
})

export default updateNftId
