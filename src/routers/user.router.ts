/**
 * User Routes
 *
 * This module exports a router that handles user-related routes.
 *
 * @module routers/user.router
 */

import { Router } from "express"
import { validateSchema } from "../middlewares"
import { getSingleUserSchema, registerUserSchema } from "../validation/user"
import { registerUser, getSingleUser, getNonce } from "../controllers/user"

/**
 * User router.
 *
 * Manages user-related routes and operations.
 *
 * @type {Router}
 */
const router: Router = Router()

/**
 * Registers a new user.
 *
 * This route validates the incoming request body against the `registerUserSchema`
 * and then calls the `registerUser` controller to complete the registration process.
 *
 * @route POST /register
 * @access public
 * @uses Middleware validateSchema to validate the request body against the `registerUserSchema`.
 * @uses Controller registerUser to handle the registration process.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
router
    .route("/register")
    /**
     * Handles new user registration requests.
     *
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    .post(validateSchema(registerUserSchema), registerUser)

/**
 * Retrieves a single user.
 *
 * This route validates the incoming query parameters against the `getSingleUserSchema`
 * and then calls the `getSingleUser` controller to fetch the user data.
 *
 * @route GET /
 * @access public
 * @uses Middleware validateSchema to validate the request query parameters against the `getSingleUserSchema`.
 * @uses Controller getSingleUser to fetch the user data.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
router
    .route("/")
    /**
     * Handles single user retrieval requests.
     *
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    .get(validateSchema(getSingleUserSchema), getSingleUser)

/**
 * Retrieves a single user nonce.
 *
 * This route retrieves a single user's nonce.
 *
 * @route GET /nonce
 * @access public
 * @uses Controller getNonce to fetch the user's nonce.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
router
    .route("/nonce")
    /**
     * Handles user nonce retrieval requests.
     *
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    .get(getNonce)

/**
 * Exports the user router.
 *
 * Makes the user router available for import and use in other modules.
 *
 * @returns {Router}
 */
export default router
