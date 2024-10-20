/**
 * Get Nonce User Controller
 *
 * This controller is responsible for generating and returning a nonce value.
 * A nonce is a unique, one-time use number that can be used to prevent replay attacks.
 *
 * @module controllers/user/getNonce.user.controller
 */

import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import { generateNonceService } from "../../services/user"
import { IMySessionData } from "../../types"
import responseMessage from "../../constants/responseMessage"

/**
 * Get Nonce
 *
 * This function generates a nonce, stores it in the user's session data, and returns it in the response.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 */
const getNonce = asyncHandler((req: Request, res: Response) => {
    /**
     * The user's session data.
     * @type {IMySessionData}
     */
    const mySession: IMySessionData = req.session as IMySessionData

    /**
     * Generate a new nonce using the generateNonceService.
     */
    mySession.nonce = generateNonceService()

    /**
     * Set the Content-Type header to "text/plain" to indicate that the response body contains plain text.
     */
    res.setHeader("Content-Type", "text/plain")

    /**
     * Send a successful response with the generated nonce.
     *
     * @param {number} 200 - The HTTP status code for the response.
     * @param {string} responseMessage.SUCCESSFUL_OPERATION - The message to be included in the response body.
     * @param {string} mySession.nonce - The generated nonce to be included in the response body.
     */
    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("Nonce"), { nonce: mySession.nonce })
})

export default getNonce
