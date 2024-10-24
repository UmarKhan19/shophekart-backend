// src/services/order/getSellerHistory.order.service.ts
import { Types } from "mongoose"
import { Order } from "../../models"

export default async function getSellerHistoryService(userId: Types.ObjectId) {
    const orders: TSellerOrder[] = await Order.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $match: {
                "product.0.sellerId": new Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "product.0.category",
                foreignField: "_id",
                as: "category"
            }
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
                    imageUrl: {
                        $arrayElemAt: ["$product.images", 0]
                    },
                    name: {
                        $arrayElemAt: ["$product.name", 0]
                    },
                    description: {
                        $arrayElemAt: ["$product.description", 0]
                    },
                    type: {
                        $arrayElemAt: ["$product.type", 0]
                    },
                    currencyType: {
                        $arrayElemAt: ["$product.currencyType", 0]
                    }
                },
                categoryLabel: {
                    $arrayElemAt: ["$category.label", 0]
                }
            }
        }
    ])

    return orders
}

type TSellerOrder = {
    orderStatus: "pending" | "delivering" | "delivered" | "cancelled" | "dispute"
    deliveryBy: string
    buyerId: string
    productIdOnChain: number
    nftId: number
    categoryLabel: string
    _id: string
    soldAtPrice: number
    shippingPrice: number
    product: {
        imageUrl: string[]
        name: string
        description: string
        type: "FixedProduct"
        currencyType: "USDT" | "USDC" | "CSHOP" | "BNB"
    }[]
}
