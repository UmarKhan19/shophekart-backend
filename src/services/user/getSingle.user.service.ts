/**
 * Implementation of the get single user service.
 *
 * This function queries the User model to find a user that matches the provided wallet address.
 * If the user is not found, it throws an error. If any error occurs during the retrieval process,
 * it throws an error with a custom message.
 *
 * @module src/services/user/getSingle.user.service
 * @async
 * @function getSingleUserService
 * @param {string} walletAddress - The Ethereum wallet address to query the user by (e.g., '0x742d35Cc6634C0532925a3b844Bc454e4438f44e').
 * @throws {Error} If the User is not found in the database.
 * @throws {Error} If any error occurs during the retrieval process.
 * @returns {Promise<IUserDocument>} A promise that resolves to the found User document.
 * @example
 * const walletAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
 * const user = await getSingleUserService(walletAddress);
 * console.log(user); // prints the found User document
 */

import responseMessage from "../../constants/responseMessage"
import { User } from "../../models"
import { IUserDocument } from "../../types"

/**
 * @typedef {object} IUserDocument
 * @property {string} _id
 * @property {string} walletAddress
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {object} User
 * @property {string} _id
 * @property {string} walletAddress
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {object} Error
 * @property {string} message
 */

/**
 * @typedef {object} responseMessage
 * @property {function} NOT_FOUND
 */

/**
 * Queries the User model to find a user that matches the provided wallet address.
 *
 * @async
 * @function getSingleUserService
 * @throws {Error} If the User is not found in the database.
 * @throws {Error} If any error occurs during the retrieval process.
 * @returns {Promise<IUserDocument>} A promise that resolves to the found User document.
 */
const getSingleUserService = async (walletAddress: `0x${string}`): Promise<IUserDocument> => {
    /**
     * Tries to execute the query to find the user.
     */
    try {
        /**
         * Queries the User model to find a user that matches the provided wallet address.
         *
         * @async
         * @function User.findOne
         * @param {object} query - The query to find the user by wallet address.
         * @returns {Promise<IUserDocument|null>} A promise that resolves to the found User document or null.
         */
        const user = await User.findOne({ walletAddress })

        if (!user) {
            /**
             * Throws an error if the User is not found in the database.
             *
             * @throws {Error} - User not found error
             * @example
             * throw new Error(responseMessage.NOT_FOUND("User"));
             */
            throw new Error(responseMessage.NOT_FOUND("User"))
        }

        /**
         * Returns the found User document.
         *
         * @returns {IUserDocument} The found User document.
         * @example
         * return user;
         */
        return user
    } catch (error) {
        /**
         * Throws an error with a custom message if any error occurs during the retrieval process.
         *
         * @throws {Error} - Error with a custom message
         * @example
         * throw new Error(`Failed to retrieve user: ${(error as Error).message}`);
         */
        throw new Error(`Failed to retrieve user: ${(error as Error).message}`)
    }
}

export default getSingleUserService
