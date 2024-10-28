import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import getProductsBySellerService from "../../services/product/getBySeller.product.service"
import responseMessage from "../../constants/responseMessage"
import { IMySessionData } from "../../types"

const getProductsBySeller = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const mySession = req.session as IMySessionData

    if (!mySession || !mySession.userData || !mySession.userId) {
        return httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
    }

    const products = await getProductsBySellerService(mySession.userId)

    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Seller's Product"), products)
})

export default getProductsBySeller
