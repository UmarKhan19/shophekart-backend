import { Types } from "mongoose"
import { Order } from "../../models"
import { TOrderHistory } from "../../types"

export default async function getBuyerHistoryService(userId: Types.ObjectId): Promise<TOrderHistory[]> {
    const orders: TOrderHistory[] = await Order.aggregate([
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

    return orders
}
