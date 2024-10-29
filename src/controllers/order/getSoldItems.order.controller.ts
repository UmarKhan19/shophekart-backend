import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import { IMySessionData } from "../../types"
import getSoldItemsOfUserService from "../../services/order/getSoldItemsOfUser.order.service"

const getSoldItemsOfUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const mySession = req.session as IMySessionData

    if (!mySession.userId) {
        httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
        return
    }

    const products = await getSoldItemsOfUserService(mySession.userId)

    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Logged in user's sold products'"), products)
})

export default getSoldItemsOfUser
