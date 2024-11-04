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
 * @param {string} walletAddress - The wallet address of the user to update.
 * @param {string} description - The new description text to set.
 * @throws {Error} If the user is not found or an error occurs during the update.
 * @returns {Promise<IUserDocument>} A promise that resolves to the updated user document.
 */
const updateDescriptionService = async (walletAddress: `0x${string}`): Promise<IUserDocument> => {
    try {
        /**
         * Finds the user by wallet address and updates the description.
         *
         * @type {IUserDocument|null} user - The updated user document, or null if not found.
         */
        const user = await User.findOneAndUpdate(
            { walletAddress },
            { new: true, runValidators: true }
        );

        if (!user) {
            throw new Error(responseMessage.NOT_FOUND("User"));
        }

        return user;
    } catch (error) {
        throw new Error(`Failed to update description: ${(error as Error).message}`);
    }
};

export default updateDescriptionService;
