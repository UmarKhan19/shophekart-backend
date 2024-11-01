import { Types } from "mongoose"
import { Review } from "../../models"

const createReviewService = async ({ ...data }: TCreateReview) => {
    const review = await Review.create(data)
    return review
}

export default createReviewService

type TCreateReview = {
    comment: string
    rating: number
    reviewType: "positive" | "neutral" | "negative"
    reviewerId: Types.ObjectId
    targetId: Types.ObjectId
    targetType: "product" | "user"
}
