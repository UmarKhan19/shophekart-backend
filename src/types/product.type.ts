// src/types/product.type.ts
import { Types } from "mongoose"

interface IProductDocument {
    _id: string
    productIdOnChain: string
    sellerId: Types.ObjectId
    currencyType: "USDT" | "USDC" | "CSHOP" | "BNB"
    currencyAddress: string
    name: string
    description: string
    shippingCharges:number
    shippingDuration:number
    details: string
    images: string[]
    shippingType: "GLOBAL" | "LOCAL"
    status: "draft" | "published" | "archived" | "deleted"
    rating: number
    productAddress: string | null
    category: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

export default IProductDocument
