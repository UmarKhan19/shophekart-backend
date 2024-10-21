import mongoose from "mongoose"
import { TShippingAddress } from "../types"

const shippingAddressSchema = new mongoose.Schema<TShippingAddress>(
    {
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true,
            lowercase: true
        },
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Buyer ID is required"]
        },
        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true,
            lowercase: true
        },
        isPrimary: {
            type: Boolean,
            default: false
        },
        postalCode: {
            type: String,
            required: [true, "Postal code is required"],
            trim: true
        },
        state: {
            type: String,
            required: [true, "State is required"],
            trim: true,
            lowercase: true
        }
    },
    {
        timestamps: true
    }
)

const ShippingAddress = mongoose.model<TShippingAddress>("ShippingAddress", shippingAddressSchema)

export default ShippingAddress
