/**
 * Handles the user logout functionality by destroying the session.
 *
 * @module controllers/user/logout.user.controller
 */

import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"

/**
 * Destroys the user's session to log them out.
 *
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {NextFunction} next - The Express NextFunction object.
 * @returns {void} Does not return any value.
 *
 * @throws {httpError} If an error occurs while destroying the session, an httpError is thrown.
 */
const logout = asyncHandler((req: Request, res: Response, next: NextFunction): void => {
    /**
     * Destroys the user's session.
     *
     * @param {function} callback - A callback function to handle the result of destroying the session.
     */
    req.session.destroy((error: Error) => {
        /**
         * If an error occurs while destroying the session, an httpError is thrown.
         */
        httpError(next, error, req, 500)
    })

    /**
     * Sends a successful response to the client if the session is destroyed successfully.
     */
    httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION("User logout"), null)
})

export default logout
