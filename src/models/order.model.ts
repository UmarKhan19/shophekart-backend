/**
 * Import the required modules from Mongoose.
 * @module
 */
import { Schema, model } from "mongoose"
import { Types } from "mongoose"
import { TOrder } from "../types"
import { ORDER_STATUS_VALUES } from "../constants/application"

/**
 * Define the schema for the Order model.
 * @typedef {Object} OrderSchema
 * @property {String} orderStatus - The status of the order.
 * @property {Date} deliveryBy - The date by which the order should be delivered.
 * @property {ObjectId} buyerId - The ID of the buyer.
 * @property {ObjectId} productId - The ID of the product.
 * @property {String} productIdOnChain - The product ID on the blockchain.
 * @property {Number} tokenId - The token ID.
 * @property {Number} soldAtPrice - The price at which the product was sold.
 * @property {Number} shippingPrice - The price of shipping.
 * @property {Date} createdAt - The date the order was created.
 * @property {Date} updatedAt - The date the order was last updated.
 */
const orderSchema = new Schema(
    {
        /**
         * The status of the order.
         * @type {String}
         * @enum {String} ["pending", "shipped", "delivered", "cancelled"]
         * @required
         * @description The order status can be one of four values: "pending", "shipped", "delivered", or "cancelled".
         */
        orderStatus: {
            type: String,
            required: true,
            enum: ORDER_STATUS_VALUES
        },

        /**
         * The date by which the order should be delivered.
         * @type {Date}
         * @required
         * @description The delivery date should be in the future.
         */
        
            shippingAddress: {
              type: Types.ObjectId,
              ref: "ShippingAddress",
              required: true,
            },
        deliveryBy: {
            type: Date,
            required: true,
            validate: {
                /**
                 * Validate that the delivery date is in the future.
                 * @param {Date} value The delivery date.
                 * @returns {Boolean} True if the delivery date is in the future, false otherwise.
                 */
                validator: (value: Date) => {
                    const now = new Date()
                    return value > now
                },
                /**
                 * The message to display if the validation fails.
                 */
                message: "Delivery date must be in the future"
            }
        },

        /**
         * The ID of the buyer.
         * @type {ObjectId}
         * @required
         * @ref {User} The User model.
         */
        buyerId: {
            type: Types.ObjectId,
            required: true,
            ref: "User"
        },

        /**
         * The ID of the product.
         * @type {ObjectId}
         * @required
         * @ref {Product} The Product model.
         */
        productId: {
            type: Types.ObjectId,
            required: true,
            ref: "Product"
        },

        /**
         * The product ID on the blockchain.
         * @type {String}
         * @required
         */
        productIdOnChain: {
            type: Number,
            required: true
        },

        nftId: {
            type: Number,
            required: true,
            default: 0
        },

        /**
         * The price at which the product was sold.
         * @type {Number}
         * @required
         */
        soldAtPrice: {
            type: Number,
            required: true
        },

        /**
         * The price of shipping.
         * @type {Number}
         * @required
         */
        shippingPrice: {
            type: Number,
            required: true
        }
    },
    {
        /**
         * Add timestamps to the schema.
         */
        timestamps: true
    }
)

/**
 * Define the Order model.
 * @typedef {Model} Order
 */
const Order = model<TOrder>("Order", orderSchema)

/**
 * Export the Order model.
 */
export default Order
