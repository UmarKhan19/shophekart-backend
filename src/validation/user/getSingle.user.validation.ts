/**
 * Validation schema for getting a single user.
 *
 * This schema defines the structure and constraints for the request body when retrieving a single user.
 *
 * @module src/validation/user/getSingle.user.validation
 */

import { object, string, TypeOf } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

/**
 * Validation schema for getting a single user.
 *
 * @description
 * Defines the validation rules for the request body when retrieving a single user.
 *
 * @namespace GetSingleUser
 */

/**
 * Validation schema for getting a single user.
 *
 * @description
 * This schema expects a JSON object with a single property "walletAddress" in the request body.
 *
 * @typedef {object} GetSingleUser
 *
 * @property {object} body
 *
 * @property {string} body.walletAddress
 *   The wallet address of the user to retrieve.
 *   Must be in the Ethereum address format (a 42-character hexadecimal string starting with "0x").
 *
 * @example
 * Request body example:
 * {
 *   "walletAddress": "0x1234567890123456789012345678901234567890"
 * }
 *
 * @throws {Error}
 *   If the request body is missing or not a JSON object.
 * @throws {Error}
 *   If the "walletAddress" property is missing or not a string.
 * @throws {Error}
 *   If the "walletAddress" property does not match the Ethereum address format.
 */
const getSingleUser = object({
    /**
     * Request body schema.
     */
    body: object({
        /**
         * The wallet address of the user to retrieve.
         *
         * @description
         * Must be a 42-character hexadecimal string starting with "0x".
         *
         * @throws {Error}
         *   If the wallet address is missing.
         * @throws {Error}
         *   If the wallet address does not match the Ethereum address format.
         * @example "0x1234567890123456789012345678901234567890"
         */
        walletAddress: string({
            /**
             * Error message for a missing wallet address.
             */
            required_error: validationErrorMessages.MISSING_ENTITY("Wallet Address")
        }).regex(
            /^(0x)?[0-9a-fA-F]{40}$/,
            /**
             * Error message for an invalid wallet address.
             */
            validationErrorMessages.INVALID_ENTITY("Wallet Address")
        )
    })
})

/**
 * Exports the `GetSingleUser` validation schema.
 *
 * @description
 * This schema can be used to validate the request body when retrieving a single user.
 *
 * @exports GetSingleUser
 */

/**
 * Type definition for the `GetSingleUser` schema.
 *
 * @description
 * This type defines the shape of the request body when retrieving a single user.
 *
 * @typedef {object} GetSingleUser
 * @property {object} body
 * @property {string} body.walletAddress
 */
export default getSingleUser
/**
 * Type definition for the `GetSingleUser` schema.
 *
 * @description
 * This type defines the shape of the request body when retrieving a single user.
 *
 * @typedef {object} IGetSingleUser
 * @property {object} body
 * @property {string} body.walletAddress
 */
export type IGetSingleUser = TypeOf<typeof getSingleUser>
