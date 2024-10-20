// src/types/product.type.ts
import { Types } from "mongoose"

interface IProductDocument {
    _id: string
    productIdOnChain: string
    sellerId: Types.ObjectId
    currencyType: "usdt" | "usdc" | "cshop" | "bnb"
    currencyAddress: string
    name: string
    description: string
    details: string
    images: string
    shippingType: "global" | "local"
    status: "draft" | "published" | "archived" | "deleted"
    rating: number
    productAddress: string | null
    category: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

export default IProductDocument
