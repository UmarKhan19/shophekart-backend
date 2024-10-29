import { Types } from "mongoose"
import { Order } from "../../models"

const getSoldItemsOfUserService = async (sellerId: Types.ObjectId) =>
    await Order.aggregate<TProductSummary[]>([
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                pipeline: [
                    {
                        $match: {
                            sellerId
                        }
                    },
                    {
                        $lookup: {
                            from: "categories",
                            localField: "category",
                            foreignField: "_id",
                            pipeline: [
                                {
                                    $project: {
                                        label: 1,
                                        _id: 0
                                    }
                                }
                            ],
                            as: "category"
                        }
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
                        $project: {
                            name: 1,
                            description: 1,
                            type: 1,
                            shippingType: 1,
                            currencyType: 1,
                            images: {
                                $arrayElemAt: ["$images", 0]
                            },
                            category: {
                                $arrayElemAt: ["$category.label", 0]
                            },
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
                    }
                ],
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {
            $group: {
                _id: "$product.productId",
                productId: {
                    $first: "$product._id"
                },
                productName: {
                    $first: "$product.name"
                },
                productDescription: {
                    $first: "$product.description"
                },
                productType: {
                    $first: "$product.type"
                },
                shippingType: {
                    $first: "$product.shippingType"
                },
                soldPrice: {
                    $first: "$soldAtPrice"
                },
                currencyType: {
                    $first: "$product.currencyType"
                },
                productImage: {
                    $first: "$product.images"
                },
                category: {
                    $first: "$product.category"
                },
                reviewCount: {
                    $first: "$product.reviewCount"
                },
                averageRating: {
                    $first: "$product.averageRating"
                },
                salesCount: {
                    $sum: 1
                } // Count the number of documents per productId
            }
        },
        {
            $project: {
                _id: 0,
                productId: 1,
                productName: 1,
                productDescription: 1,
                productType: 1,
                shippingType: 1,
                soldPrice: 1,
                currencyType: 1,
                productImage: 1,
                category: 1,
                reviewCount: 1,
                averageRating: 1,
                salesCount: 1
            }
        }
    ])

export default getSoldItemsOfUserService

type TProductSummary = {
    productId: string
    productName: string
    productDescription: string
    productType: "FixedProduct" | "OtherProductTypes" // Adjust according to other possible product types
    shippingType: "GLOBAL" | "LOCAL" // Adjust based on allowed shipping types
    soldPrice: number
    currencyType: "CSHOP" | "USD" | "EUR" // Adjust according to other currency types used
    productImage: string
    category: string
    reviewCount: number
    averageRating: number
    salesCount: number
}
