import { Router } from "express"

import checkLimitController from "../controllers/chat/chatLimit.controller"

const walletRouter: Router = Router()

/**
 * Checks the limit for a user's wallet.
 *
 * @route POST /check-limit
 * @access public
 * @uses Middleware validateSchema to validate the request body against `checkLimitSchema`.
 * @uses Controller checkLimit to handle the checking process.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
walletRouter.post("/check-limit", checkLimitController)

export default walletRouter
