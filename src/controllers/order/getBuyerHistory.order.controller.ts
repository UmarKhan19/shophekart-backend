import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import { IMySessionData } from "../../types"
import responseMessage from "../../constants/responseMessage"
import { getBuyerHistoryService } from "../../services/order"

const getBuyerHistory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const mySession = req.session as IMySessionData

    if (!mySession.userId) {
        httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
        return
    }

    const orders = await getBuyerHistoryService(mySession.userId)

    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Buyer History"), orders)
})

export default getBuyerHistory
