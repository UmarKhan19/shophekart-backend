import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import { TCreateReview } from "../../validation/review/review.validation"
import createReviewService from "../../services/review/review.service"
import { Types } from "mongoose"
import getUserTargetReview from "../../services/review/getUserTargetReview.service"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const createReviewController = asyncHandler(async (req: Request<{}, {}, TCreateReview["body"]>, res: Response, next: NextFunction) => {
    const { comment, rating, reviewType, reviewerId, targetId, targetType } = req.body

    const reviewExists = await getUserTargetReview({ targetId: new Types.ObjectId(targetId), userId: new Types.ObjectId(reviewerId) })

    if (reviewExists) {
        httpError(next, new Error(`You have already reviewed this ${targetType}`), req, 400)
        return
    }

    const review = await createReviewService({
        comment,
        rating,
        reviewType,
        reviewerId: new Types.ObjectId(reviewerId),
        targetId: new Types.ObjectId(targetId),
        targetType
    })
    httpResponse(req, res, 201, responseMessage.CREATED_SUCCESSFULLY("Review"), review)
})
export default createReviewController
