/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * User model definition.
 *
 * This file defines the structure and schema for the User data model in the application.
 * It includes the necessary imports, interface definitions, schema definitions, and model creation.
 *
 */

import { model, Schema } from "mongoose"
import validationErrorMessages from "../constants/validationErrors"
import { IUserDocument } from "../types"

/**
 * userSchema definition.
 *
 * This schema defines the structure for the User data model.
 * It includes fields for walletAddress, name, description, and trustScore.
 * Each field has validation rules and constraints defined.
 **/
const userSchema = new Schema(
    {
        /**
         * The unique wallet address of the user.
         *
         * This field is required and must be a string.
         * It is also unique and indexed for efficient querying.
         */
        walletAddress: {
            type: String,
            required: [true, validationErrorMessages.MISSING_ENTITY("Wallet Address")],
            unique: true,
            index: true
        },
        
        /**
         * The name of the user.
         *
         * This field is optional and defaults to the wallet address if not provided.
         */
        name: {
            type: String,
            default: function () {
              return (this as any).walletAddress; // Type assertion to access walletAddress
            },
            required:true
          },
        
        description: {
            type: String,
            required: [true],
            default: "Explore my top picks from the world of e-commerce, featuring products I've carefully curated to elevate your shopping experience. Whether you're looking for the latest deals or timeless essentials, I've got you covered."
        },

        /**
         * The trust score of the user.
         *
         * This field is required and must be a number value.
         * It has a minimum value of 0 and defaults to 0 if not provided.
         */
        trustScore: {
            type: Number,
            required: true,
            min: [0, validationErrorMessages.MIN_VALUE("Trust Score", 0)],
            default: 0
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
 * User model creation.
 *
 * @description This creates a Mongoose model for the User data model using the defined schema.
 * The model is exported as the default export of this module.
 *
 * @property {string} _id - The unique identifier for the document.
 * @property {`0x${string}`} walletAddress - The user's wallet address, starting with '0x' followed by a string.
 * @property {string} name - The user's name, defaults to the wallet address if not specified.
 * @property {number} trustScore - A numerical value representing the user's trust score.
 * @property {Date} createdAt - The date and time the document was created.
 * @property {Date} updatedAt - The date and time the document was last updated.
 */
const User = model<IUserDocument>("User", userSchema)

export default User
