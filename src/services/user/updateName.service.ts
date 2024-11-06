/**
 * Service to update the description of a user.
 *
 * @module services/user/updateDescription.service
 */

import responseMessage from "../../constants/responseMessage";
import { User } from "../../models";
import { IUserDocument } from "../../types";

/**
 * Updates the description field of the user identified by wallet address.
 *
 * @async
 * @function updateDescriptionService
 * @param {`0x${string}`} walletAddress - The wallet address of the user to update.
 * @param {string} description - The new description text to set.
 * @throws {Error} If the user is not found or an error occurs during the update.
 * @returns {Promise<IUserDocument>} A promise that resolves to the updated user document.
 */
const updateNameService = async (walletAddress: `0x${string}`, name: string): Promise<IUserDocument> => {
    try {
        /**
         * Finds the user by wallet address.
         *
         * @type {IUserDocument | null} user - The user document, or null if not found.
         */
        const user = await User.findOne({ walletAddress });

        // If no user is found, throw a 'not found' error
        if (!user) {
            throw new Error(responseMessage.NOT_FOUND("User"));
        }

        // Update the description field with the new value
        user.name = name;

        // Save the updated user document
        await user.save();

        // Return the updated user document
        return user;
    } catch (error) {
        // Throw a custom error message if the update fails
        throw new Error(`Failed to update description: ${(error as Error).message}`);
    }
};

export default updateNameService;
