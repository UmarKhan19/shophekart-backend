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
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true
        },
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Buyer ID is required"],
            trim: true
        },
        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true,
            lowercase: true
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
