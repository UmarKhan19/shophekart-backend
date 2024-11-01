import { Request, Response, NextFunction } from "express"
import { Review } from "../../models"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"
import { Types } from "mongoose"

export const likeController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId
    const { userId } = req.body as { userId: string }

    const review = await Review.findById(reviewId)

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
    const { userId } = req.body as { userId: string }
    const review = await Review.findById(reviewId)

    if (!review) {
        httpError(next, new Error(responseMessage.NOT_FOUND("Review")), req, 404)
        return
    }

    if (review.dislikedBy.includes(new Types.ObjectId(userId))) {
        await review.updateOne({ $inc: { dislikes: -1 }, $pull: { dislikedBy: userId } })
    } else {
        if (review.likedBy.includes(new Types.ObjectId(userId))) await review.updateOne({ $inc: { likes: -1 }, $pull: { likedBy: userId } })
        await review.updateOne({ $inc: { dislikes: 1 }, $addToSet: { dislikedBy: userId } })
    }

    httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("Dislikes Increased"), review)
})
