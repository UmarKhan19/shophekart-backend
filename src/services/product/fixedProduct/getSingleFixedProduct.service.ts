import { FixedProduct } from "../../../models"
import responseMessage from "../../../constants/responseMessage"
import { Types } from "mongoose"

const getSingleFixedProduct = async (fixedProductId: string): Promise<TSingleProduct> => {
    try {
        const fixedProduct: TSingleProduct[] = await FixedProduct.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(fixedProductId)
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $lookup: {
                    from: "reviews",
                    let: {
                        productId: "$_id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$targetId", "$$productId"]
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                reviewCount: {
                                    $sum: 1
                                },
                                averageRating: {
                                    $avg: "$rating"
                                }
                            }
                        }
                    ],
                    as: "reviewStats"
                }
            },
            {
                $addFields: {
                    reviewCount: {
                        $ifNull: [
                            {
                                $arrayElemAt: ["$reviewStats.reviewCount", 0]
                            },
                            0
                        ]
                    },
                    averageRating: {
                        $ifNull: [
                            {
                                $arrayElemAt: ["$reviewStats.averageRating", 0]
                            },
                            0
                        ]
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            "$$ROOT",
                            {
                                category: "$category.label"
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    reviewStats: 0
                }
            }
        ])

        if (!fixedProduct) {
            throw new Error(responseMessage.NOT_FOUND("Fixed Product"))
        }

        return fixedProduct[0]
    } catch (error) {
        throw new Error(`Failed to get fixed product: ${(error as Error).message}`)
    }
}

export default getSingleFixedProduct

type TSingleProduct = {
    type: "FixedProduct"
    __v: number
    shippingDuration: number
    currencyType: "USDT" | "USDC" | "CSHOP" | "BNB"
    shippingType: "GLOBAL" | "LOCAL"
    status: "draft" | "published" | "archived" | "deleted" | "out of stock"
    currencyAddress: string
    stock: number
    createdAt: Date
    reviewCount: number
    _id: string
    images: string[]
    price: number
    details: string
    description: string
    shippingCharges: number
    productIdOnChain: number
    productAddress: string
    sellerId: string
    updatedAt: Date
    averageRating: number
    name: string
    category: string
}
