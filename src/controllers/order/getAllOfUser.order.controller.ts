import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import { IMySessionData } from "../../types"
import responseMessage from "../../constants/responseMessage"
import { getAllOrdersOfLoggedinUserService } from "../../services/order"

const getAllOrdersOfLoggedinUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const mySession = req.session as IMySessionData

    if (!mySession.userId) {
        httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
        return
    }

    const userOrders = await getAllOrdersOfLoggedinUserService(mySession.userId)

    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Users order"), userOrders)
})

export default getAllOrdersOfLoggedinUser
