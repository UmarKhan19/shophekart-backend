import { Schema, model } from "mongoose";
import IProductDocument from "../types/product.type";

const productSchema = new Schema<IProductDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    images: { type: String, required: true },
    currencyType: { type: String, required: true },
    shippingType: { type: String, required: true },
    status: { type: String, required: true },
    rating: { type: Number, required: true },
    productAddress: { type: Schema.Types.ObjectId },
    category: { type: Schema.Types.ObjectId },
    sellerId: { type: Schema.Types.ObjectId },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default model<IProductDocument>("Product", productSchema);
