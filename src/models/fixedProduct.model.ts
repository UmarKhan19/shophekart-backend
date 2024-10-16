/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from "mongoose";
import IFixedProductDocument from "../types/fixedProduct.type";
import Product from "./product.model";  

// Size sub-document schema (for sizes with individual prices and stock)
const sizeSchema = new Schema({
  size: { type: String, required: true },  // Size (e.g., 'S', 'M', 'L', etc.)
  price: { type: Number, required: true },  // Price for this size
  stock: { type: Number, required: true }   // Stock for this size
});

// FixedProduct schema
const fixedProductSchema = new Schema<IFixedProductDocument>({
  productId: { type: Schema.Types.ObjectId, ref: Product, required: true },  // Reference to the Product model
  // Conditional fields:
  sizes: {
    type: [sizeSchema],  // Array of size sub-documents (if sizes are present)
    validate: {
      validator: function (sizes: any) {
        // Ensure that either sizes are provided or price/stock, but not both
        return (sizes && sizes.length > 0) || (!this.price && !this.stock);
      },
      message: "Either provide sizes with price and stock, or a single price and stock without sizes."
    }
  },
  // If sizes are not provided, use these fields:
  price: {
    type: Number,
    required: function() { return !this.sizes || this.sizes.length === 0; }  // Required if sizes are not provided
  },
  stock: {
    type: Number,
    required: function() { return !this.sizes || this.sizes.length === 0; }  // Required if sizes are not provided
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<IFixedProductDocument>("FixedProduct", fixedProductSchema);
