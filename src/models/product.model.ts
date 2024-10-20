import { Schema, model } from "mongoose"
import IProductDocument from "../types/product.type"
import Category from "../models/category.model"

// const addressSchema = new Schema({
//     address: { type: String, required: true, trim: true },
//     state: { type: String, required: true, trim: true },
//     country: { type: String, required: true, trim: true },
//     postalCode: { type: String, required: true, trim: true }
// })

const productSchema = new Schema<IProductDocument>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        details: { type: String, required: true },
        images: [ { type: String, required: true } ],
        currencyType: { type: String, required: true, enum: ["USDT", "USDC", "CSHOP", "BNB"] },
        shippingType: { type: String, required: true, enum: ["GLOBAL","LOCAL"] },
        shippingCharges:{ type: Number, required: true, default: 0 },
        status: { type: String, required: true, default: "published" },
        rating: { type: Number, required: true, default: 0 },
        currencyAddress: { type: String, required: true },
        productIdOnChain: { type: String, required: true },
        // productAddress: { type: addressSchema },
        category: { type: Schema.Types.ObjectId, ref: Category, required: true },
        sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true, discriminatorKey: "type" }
)

const Product = model<IProductDocument>("Product", productSchema)

export default Product
