/**
 * Controller for retrieving a user's profile information.
 *
 * This controller handles GET requests to retrieve a user's profile data.
 * It first checks if the user has an active session and if the session contains a valid user ID.
 * If both checks pass, it retrieves the user's profile data from the database and returns it in the response.
 *
 * @module controllers/user/getProfile.user.controller
 */

import { NextFunction, Request, Response } from "express"

/**
 * Importing utility functions for handling asynchronous operations, HTTP errors, and HTTP responses.
 */

import { asyncHandler, httpError, httpResponse } from "../../utils"
import { IMySessionData } from "../../types"

/**
 * Importing the User model for interacting with the user database.
 */

import { User } from "../../models"
import responseMessage from "../../constants/responseMessage"

/**
 * Controller for retrieving a user's profile information.
 *
 * @async
 * @function getProfile
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function in the chain.
 */

const getProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    /**
     * Retrieving the session data from the request object.
     */

    const mySession = req.session as IMySessionData

    /**
     * Checking if the session data contains a valid user data object and a valid user ID.
     */

    if (!mySession.userData || !mySession.userId) {
        /**
         * If no user data or userId is found, throwing an HTTP error with a 401 status code.
         */

        httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
        return
    }

    /**
     * Retrieving the user's profile data from the database using the user ID.
     */

    const user = await User.findById(mySession.userId)

    if (!user) {
        httpError(next, new Error(responseMessage.NOT_FOUND("User")), req, 404)
        return
    }

    /**
     * Returning the user's profile data in the HTTP response with a 200 status code.
     */

    httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION, { user })
})

export default getProfile
