import { Types } from "mongoose"
import { Review } from "../../models"

export default async function getUserTargetReview({ ...data }: { userId: Types.ObjectId; targetId: Types.ObjectId }) {
    return await Review.findOne({ reviewerId: data.userId, targetId: data.targetId })
}
