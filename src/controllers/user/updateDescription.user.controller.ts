/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * Controller to handle the PUT request for updating user description.
 *
 * @module controllers/user/updateDescription.controller
 */

import { Request, Response } from "express";
import updateDescriptionService from "../../services/user/updateDescriptionService";
import { asyncHandler, httpResponse } from "../../utils";
import responseMessage from "../../constants/responseMessage";


/**
 * Update the description of a user.
 *
 * @async
 * @param {Request<{}, {}, IUpdateDescription["body"]>} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @description Updates the description field of the user identified by wallet address.
 *
 * @throws {Error} If an error occurs while updating the user description.
 *
 * @returns {void} Sets the HTTP response with success message and updated user data.
 */
const updateDescription = asyncHandler(async (req: Request<{}, {}>, res: Response) => {
    /**
     * The wallet address and new description of the user.
     *
     * @type {string} walletAddress
     * @type {string} description
     */
    const { walletAddress} = req.body;

    /**
     * Updates the user description by calling the service function.
     *
     * @type {IUserDocument} updatedUser - The updated user document.
     */
    const updatedUser = await updateDescriptionService(walletAddress);

    /**
     * Sets the HTTP response with the updated user data.
     *
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {200} statusCode - HTTP status code.
     * @param {string} message - Response message.
     * @param {Object} data - Updated user data.
     */
    httpResponse(req, res, 200, responseMessage.UPDATED_SUCCESSFULLY("User description"), updatedUser);
});

export default updateDescription;
