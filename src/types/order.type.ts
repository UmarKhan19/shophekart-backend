/**
 * Represents a type definition for an order document.
 *
 * @remarks
 * The order type defines the structure of an order document in the database.
 * It specifies the properties that make up an order, such as order status, delivery date, and product information.
 */

import { Types } from "mongoose"
import { ORDER_STATUS } from "../constants/application"

/**
 * Type definition for an order document.
 *
 * @typedef {Object} TOrder
 * @property {string} orderStatus - The status of the order.
 * @property {Date} deliveryBy - The expected delivery date of the order.
 * @property {Types.ObjectId} buyerId - The ID of the buyer associated with the order.
 * @property {Types.ObjectId} productId - The ID of the product associated with the order.
 * @property {string} productIdOnChain - The product ID on the blockchain.
 * @property {number} nftId - The ID of the token associated with the order.
 * @property {number} soldAtPrice - The price at which the product was sold.
 * @property {number} shippingPrice - The shipping cost associated with the order.
 * @property {Date} createdAt - The timestamp when the order was created.
 * @property {Date} updatedAt - The timestamp when the order was last updated.
 */

type TOrder = {
    /**
     * The status of the order.
     *
     * @example
     * 'pending', 'shipped', 'delivered', 'cancelled'
     */
    orderStatus: ORDER_STATUS
    shippingAddress: Types.ObjectId;

    /**
     * The expected delivery date of the order.
     *
     * @example
     * new Date('2023-03-16T00:00:00.000Z')
     */
    deliveryBy: Date

    /**
     * The ID of the buyer associated with the order.
     *
     * @example
     * new Types.ObjectId('625296ae8b92c1239d6b55b9')
     */
    buyerId: Types.ObjectId

    /**
     * The ID of the product associated with the order.
     *
     * @example
     * new Types.ObjectId('625296ae8b92c1239d6b55b9')
     */
    productId: Types.ObjectId

    /**
     * The product ID on the blockchain.
     *
     * @example
     * '1'
     */
    productIdOnChain: number

    nftId: number

    /**
     * The price at which the product was sold.
     *
     * @example
     * 10.99
     */
    soldAtPrice: number

    /**
     * The shipping cost associated with the order.
     *
     * @example
     * 5.00
     */
    shippingPrice: number

    /**
     * The timestamp when the order was created.
     *
     * @example
     * new Date('2023-03-16T00:00:00.000Z')
     */
    createdAt: Date

    /**
     * The timestamp when the order was last updated.
     *
     * @example
     * new Date('2023-03-16T00:00:00.000Z')
     */
    updatedAt: Date
}

export default TOrder
