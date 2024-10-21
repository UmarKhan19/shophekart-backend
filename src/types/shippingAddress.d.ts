// src/types/shippingAddress.d.ts (1-49)
import { Types } from "mongoose"

type TShippingAddress = {
    _id: Types.ObjectId
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    buyerId: Types.ObjectId
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    createdAt: Date
    updatedAt: Date
}

export default TShippingAddress
