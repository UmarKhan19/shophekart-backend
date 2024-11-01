import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import getReviewsService from "../../services/review/getReviews.service"
import { Types } from "mongoose"

const getReviewsController = asyncHandler(async (req: Request, res: Response) => {
    const targetId = req.params.targetId
    const reviews = await getReviewsService(new Types.ObjectId(targetId))
    return httpResponse(req, res, 200, responseMessage.FETCHED_SUCCESSFULLY("Reviews"), reviews)
})

export default getReviewsController
