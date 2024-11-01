import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import getReviewsService from "../../services/review/getReviews.service"
import { Types } from "mongoose"
import { IMySessionData } from "../../types"

const getReviewsController = asyncHandler(async (req: Request, res: Response) => {
    const targetId = req.params.targetId
    const mySession = req.session as IMySessionData

    const reviews = await getReviewsService(new Types.ObjectId(targetId), mySession.userId)
    return httpResponse(req, res, 200, responseMessage.FETCHED_SUCCESSFULLY("Reviews"), reviews)
})

export default getReviewsController
