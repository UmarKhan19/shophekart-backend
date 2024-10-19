import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import { TChangeOrderStatus } from "../../validation/order/changeStatus.order.validation"
import responseMessage from "../../constants/responseMessage"
import { updateOrderStatusService } from "../../services/order"
import { Types } from "mongoose"
import { IMySessionData } from "../../types"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const changeStatus = asyncHandler(async (req: Request<{}, {}, TChangeOrderStatus["body"]>, res: Response) => {
    const { orderId, status } = req.body

    const order = await updateOrderStatusService(new Types.ObjectId(orderId), new Types.ObjectId((req.session as IMySessionData).userId), status)

    httpResponse(req, res, 201, responseMessage.UPDATED_SUCCESSFULLY("Order status"), order)
})

export default changeStatus
