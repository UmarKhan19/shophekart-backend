import { Request, Response, NextFunction } from "express"
import { Review } from "../../models"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import { Types } from "mongoose"
import { IMySessionData } from "../../types"

export const likeController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId
    const review = await Review.findById(reviewId)

    const mySession = req.session as IMySessionData

    const userId = mySession.userId

    if (!userId) {
        httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
        return
    }

    if (!review) {
        httpError(next, new Error(responseMessage.NOT_FOUND("Review")), req, 404)
        return
    }

    if (review.likedBy.includes(new Types.ObjectId(userId))) {
        await review.updateOne({ $inc: { likes: -1 }, $pull: { likedBy: userId } })
    } else {
        if (review.dislikedBy.includes(new Types.ObjectId(userId))) await review.updateOne({ $inc: { dislikes: -1 }, $pull: { dislikedBy: userId } })
        await review.updateOne({ $inc: { likes: 1 }, $addToSet: { likedBy: userId } })
    }

    httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Likes Increased"), review)
})

export const dislikeController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId
    const review = await Review.findById(reviewId)

    const mySession = req.session as IMySessionData

    if (!mySession.userId) {
        httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
        return
    }

    if (!review) {
        httpError(next, new Error(responseMessage.NOT_FOUND("Review")), req, 404)
        return
    }

    if (review.dislikedBy.includes(mySession.userId)) {
        await review.updateOne({ $inc: { dislikes: -1 }, $pull: { dislikedBy: mySession.userId } })
    } else {
        if (review.likedBy.includes(mySession.userId)) await review.updateOne({ $inc: { likes: -1 }, $pull: { likedBy: mySession.userId } })
        await review.updateOne({ $inc: { dislikes: 1 }, $addToSet: { dislikedBy: mySession.userId } })
    }

    httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Dislikes Increased"), review)
})
