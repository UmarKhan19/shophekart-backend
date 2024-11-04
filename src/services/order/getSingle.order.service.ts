import { Types } from "mongoose"
import { Order } from "../../models"
import responseMessage from "../../constants/responseMessage"
import { TOrderStatus } from "../../constants/application"

export default async function getSingleOrderService(orderId: Types.ObjectId, userId: Types.ObjectId): Promise<TOrder> {
    const order = await Order.aggregate<TOrder>([
        {
            $match: {
                _id: orderId
            }
        },
        {
            $lookup: {
                from: "shippingaddresses",
                localField: "shippingAddress",
                foreignField: "_id",
                as: "shippingAddress"
            }
        },
        {
            $unwind: "$shippingAddress"
        },
        {
            $lookup: {
                from: "users",
                localField: "buyerId",
                foreignField: "_id",
                as: "buyer"
            }
        },
        {
            $unwind: "$buyer"
        },
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
            $lookup: {
                from: "categories",
                localField: "product.category",
                foreignField: "_id",
                as: "product.category"
            }
        },
        {
            $unwind: "$product.category"
        },
        {
            $addFields: {
                isCallerBuyer: {
                    $eq: [userId, "$buyerId"]
                },
                isCallerSeller: {
                    $eq: [userId, "$product.sellerId"]
                }
            }
        },
        {
            $project: {
                // Fields directly from the order
                orderStatus: 1,
                soldAtPrice: 1,
                shippingPrice: 1,
                currencyType: "$product.currencyType",
                deliveryBy: 1,
                nftId: 1,

                // Caller identity checks
                isCallerBuyer: 1,
                isCallerSeller: 1,

                // Fields from the buyer
                "buyer.walletAddress": 1,

                // Fields from the product
                "product.name": 1,
                "product.images": 1,
                "product.description": 1,
                "product.category": "$product.category.label",
                "product.type": 1,

                // Fields from the shipping address (excluding buyerId and _id)
                "shippingAddress.city": 1,
                "shippingAddress.phoneNumber": 1,
                "shippingAddress.lastName": 1,
                "shippingAddress.country": 1,
                "shippingAddress.postalCode": 1,
                "shippingAddress.state": 1,
                "shippingAddress.address": 1,
                "shippingAddress.firstName": 1,
                "shippingAddress.email": 1
            }
        }
    ])

    if (!order) throw new Error(responseMessage.NOT_FOUND("Order"))

    return order[0]
}

type Address = {
    state: string
    address: string
    lastName: string
    email: string
    country: string
    postalCode: string
    city: string
    firstName: string
    phoneNumber: string
}

type Buyer = {
    walletAddress: `0x${string}`
}

type Product = {
    description: string
    images: string[]
    type: "FixedProduct" | "Auction"
    category: string
    name: string
}

type OrderStatus = TOrderStatus

type TOrder = {
    _id: Types.ObjectId
    deliveryBy: Date
    soldAtPrice: number
    product: Product
    currencyType: string
    orderStatus: OrderStatus
    shippingAddress: Address
    shippingPrice: number
    buyer: Buyer
    isCallerBuyer: boolean
    isCallerSeller: boolean
}
