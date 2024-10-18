/**
 * Controller to handle GET request for a single user.
 *
 * @module controllers/user/getSingle.user.controller
 */

import { Request, Response } from "express"
import responseMessage from "../../constants/responseMessage"
import { getSingleUserService } from "../../services/user"
import { asyncHandler, httpResponse } from "../../utils"
import { IGetSingleUser } from "../../validation/user/getSingle.user.validation"
import { IUserDocument } from "../../types"

/**
 * Get a single user by wallet address.
 *
 * @async
 * @param {Request<{}, {}, IGetSingleUser["body"]>} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @description Fetches a single user by wallet address and returns the user data in the response.
 *
 * @throws {Error} If an error occurs while fetching the user data.
 *
 * @returns {void} Sets the HTTP response with user data.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const getSingleUser = asyncHandler(async (req: Request<{}, {}, IGetSingleUser["body"]>, res: Response) => {
    /**
     * The wallet address of the user to fetch.
     *
     * @type {`0x${string}`}
     */
    const walletAddress: `0x${string}` = req.body.walletAddress as `0x${string}`

    /**
     * The user data fetched by wallet address.
     *
     * @type {IUserDocument}
     */
    const user: IUserDocument = await getSingleUserService(walletAddress)

    /**
     * Sets the HTTP response with the user data.
     *
     * @description Uses the httpResponse utility function to set the response with a 200 status code and user data.
     *
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {200} statusCode - HTTP status code.
     * @param {string} message - Response message.
     * @param {Object} data - User data.
     */
    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("User"), user)
})

export default getSingleUser
