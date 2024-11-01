import { Types } from "mongoose"
import { Review } from "../../models"

export default async function (targetId: Types.ObjectId, userId?: Types.ObjectId) {
    return await Review.aggregate<TGetReviews>([
        {
            $match: {
                targetId: targetId
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "reviewerId",
                foreignField: "_id",
                as: "reviewer",
                pipeline: [
                    {
                        $project: {
                            walletAddress: 1,
                            trustScore: 1,
                            _id: 0
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$reviewer"
        },
        {
            $addFields: {
                isLikedByUser: {
                    $in: [userId, "$likedBy"]
                },
                isDislikedByUser: {
                    $in: [userId, "$dislikedBy"]
                }
            }
        },
        {
            $project: {
                reviewerId: 0,
                likedBy: 0,
                dislikedBy: 0,
                targetId: 0,
                __v: 0,
                updatedAt: 0,
                targetType: 0
            }
        }
    ])
}

type TGetReviews = {
    _id: Types.ObjectId
    dislikes: number
    createdAt: Date
    reviewer: {
        walletAddress: `0x${string}`
        trustScore: number
    }
    reviewType: "positive" | "negative" | "neutral"
    rating: number
    comment: string
    likes: number
    isLikedByUser: boolean
    isDislikedByUser: boolean
}
