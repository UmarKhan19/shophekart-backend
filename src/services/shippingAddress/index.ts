import { Types } from "mongoose"
import { ShippingAddress } from "../../models"
import { TShippingAddress } from "../../types"

const ShippingAddressService = {
    async create(
        data: Omit<
            TShippingAddress,
            keyof {
                _id: Types.ObjectId
                createdAt: Date
                updatedAt: Date
            }
        >
    ): Promise<TShippingAddress> {
        const shippingAddress = await ShippingAddress.create(data)

        return shippingAddress
    },

    async getUserShippingAddresses(userId: Types.ObjectId): Promise<TShippingAddress[]> {
        const shippingAddresses = await ShippingAddress.find({ buyerId: userId })

        return shippingAddresses
    },

    async getSingleShippingAddresses(addressId: Types.ObjectId): Promise<TShippingAddress | null> {
        const shippingAddress = await ShippingAddress.findById(addressId)

        return shippingAddress
    },

    async updateshippingAddress(data: Partial<TShippingAddress>): Promise<TShippingAddress | null> {
        const updatedAddress = await ShippingAddress.findOneAndUpdate({ _id: data._id, buyerId: data.buyerId }, data, { new: true })

        return updatedAddress
    },

    async deleteShippingAddress(id: Types.ObjectId, userId: Types.ObjectId): Promise<TShippingAddress | null> {
        const deletedAddress = await ShippingAddress.findOneAndDelete({ _id: id, buyerId: userId })

        return deletedAddress
    }
}

export default ShippingAddressService
