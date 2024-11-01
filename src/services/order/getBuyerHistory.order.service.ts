import { Types } from "mongoose"
import { Order } from "../../models"

export default async function getBuyerHistoryService(userId: Types.ObjectId): Promise<TBuyerOrderHistory[]> {
    return await Order.aggregate<TBuyerOrderHistory>([
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {
            $match: {
                buyerId: userId
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "product.category",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $project: {
                _id: 1,
                nftId: 1,
                soldAtPrice: 1,
                buyerId: 1,
                productIdOnChain: 1,
                shippingPrice: 1,
                orderStatus: 1,
                deliveryBy: 1,
                product: {
                    _id: "$product._id",
                    imageUrl: {
                        $arrayElemAt: ["$product.images", 0]
                    },
                    name: "$product.name",
                    description: "$product.description",
                    type: "$product.type",
                    currencyType: "$product.currencyType",
                    productAddress: "$product.productAddress"
                },
                category: "$category.label"
            }
        }
    ])
}

type TBuyerOrderHistory = {
    _id: string
    nftId: number
    soldAtPrice: number
    buyerId: Types.ObjectId
    productIdOnChain: number
    shippingPrice: number
    orderStatus: string
    deliveryBy: Date
    category: string
    product: {
        _id: Types.ObjectId
        description: string
        type: string
        currencyType: string
        productAddress: string
        imageUrl: string
        name: string
    }
}
