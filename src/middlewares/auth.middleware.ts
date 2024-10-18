/**
 * Authentication middleware to verify user login status and retrieve user data.
 *
 * @param {Request} req - Express request object.
 * @param {Response} _ - Express response object (not used in this middleware).
 * @param {NextFunction} next - Express next function to continue the request-response cycle.
 * @throws {Error} If the user is not logged in or user data is not found.
 */
import { Request, Response, NextFunction } from "express"
import { User } from "../models"
import { IMySessionData } from "../types"
import responseMessage from "../constants/responseMessage"
// import { httpError } from "../utils"

/**
 * Authentication middleware function.
 *
 * Verifies the presence of a user ID and user data in the session.
 * If valid, retrieves the user data from the database.
 * If invalid, raises an error and passes it to the next function in the Express chain.
 */
const authMiddleware = async (req: Request, _: Response, next: NextFunction) => {
    /**
     * Session data extended with user data type.
     */
    const session = req.session as IMySessionData

    /**
     * Check if user ID and user data are present in the session.
     */
    if (!session.userId || !session.userData) {
        /**
         * If not present, raise an error with a corresponding message.
         */
        throw new Error("User not logged in")
    }

    // try {
    /**
     * Attempt to retrieve the user data from the database using the user ID.
     */
    const user = await User.findById({ _id: session.userId })

    /**
     * Check if the user data is found in the database.
     */
    if (!user) {
        /**
         * If not found, raise an error with a corresponding message.
         */
        throw new Error(responseMessage.NOT_FOUND("User"))
    }

    /**
     * If all checks pass, continue the request-response cycle.
     */
    next()
    // }
    //  catch (error) {
    //     /**
    //      * If any error occurs during the database query, pass it to the next function in the Express chain.
    //      */
    //     httpError(next, error, req, 500)
    // }
}

export default authMiddleware
