import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import { IMySessionData } from "../../types"
import { getSellerHistoryService } from "../../services/order"

const getSellerOrderHistory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const mySession = req.session as IMySessionData

    if (!mySession.userId) {
        httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
        return
    }

    const orders = await getSellerHistoryService(mySession.userId)

    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Seller Order History"), orders)
})

export default getSellerOrderHistory
