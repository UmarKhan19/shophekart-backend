/**
 * Wallet model definition.
 *
 * This file defines the structure and schema for the Wallet data model in the application.
 * It includes the necessary imports, interface definitions, schema definitions, and model creation.
 *
 */

import { model, Schema } from "mongoose"
import { IWallet } from "../types"
/**
 * walletSchema definition.
 *
 * This schema defines the structure for the Wallet data model.
 * It includes fields for walletAddress and timestamps.
 * Each field has validation rules and constraints defined.
 **/
const walletSchema = new Schema(
    {
        /**
         * The unique wallet address of the user.
         *
         * This field is required, must be a string, and is indexed for efficient querying.
         */
        walletAddress: {
            type: String,
            required: [true, "Wallet Address is required"],
            unique: true,
            index: true
        },

        /**
         * The interaction timestamps.
         *
         * This field stores an array of Date objects representing the user's interactions.
         * It defaults to an empty array.
         */
        timestamps: {
            type: [Date],
            default: []
        }
    },
    /**
     * Schema options.
     *
     * This schema uses the timestamps option to automatically add createdAt and updatedAt fields to the document.
     */
    { timestamps: true }
)

/**
 * Wallet model creation.
 *
 * @description This creates a Mongoose model for the Wallet data model using the defined schema.
 * The model is exported as the default export of this module.
 *
 * @property {string} _id - The unique identifier for the document.
 * @property {`0x${string}`} walletAddress - The user's wallet address, starting with '0x' followed by a string.
 * @property {Date[]} timestamps - An array of timestamps representing the user's interactions.
 * @property {Date} createdAt - The date and time the document was created.
 * @property {Date} updatedAt - The date and time the document was last updated.
 */
const Wallet = model<IWallet>("Wallet", walletSchema)

export default Wallet
