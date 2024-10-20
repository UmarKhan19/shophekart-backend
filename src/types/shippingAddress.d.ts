import { Types } from "mongoose"

/**
 * Represents a shipping address.
 */
type TShippingAddress = {
    /**
     * The street address.
     */
    address: string

    /**
     * The city or town.
     */
    city: string

    /**
     * The state or province.
     */
    state: string

    /**
     * The postal code or zip code.
     */
    postalCode: string

    /**
     * The country of residence.
     */
    country: string

    /**
     * The ID of the buyer associated with this shipping address.
     */
    buyerId: Types.ObjectId

    /**
     * Whether this shipping address is the primary address for the buyer.
     */
    isPrimary: boolean
}

export default TShippingAddress
