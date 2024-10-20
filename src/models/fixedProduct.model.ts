import { Schema } from "mongoose"
import IFixedProductDocument from "../types/fixedProduct.type"
import Product from "./product.model"

// FixedProduct schema
const fixedProductSchema = new Schema<IFixedProductDocument>(
    {
        price: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { timestamps: true }
)

const FixedPriceProduct = Product.discriminator("FixedProduct", fixedProductSchema)

export default FixedPriceProduct
