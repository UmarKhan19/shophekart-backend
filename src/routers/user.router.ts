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
import { registerUser, getSingleUser } from "../controllers/user"

/**
 * User router.
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
 */
router.route("/register").post(validateSchema(registerUserSchema), registerUser)

/**
 * Retrieves a single user.
 *
 * This route validates the incoming query parameters against the `getSingleUserSchema`
 * and then calls the `getSingleUser` controller to fetch the user data.
 *
 * @route GET /
 * @access public
 */
router.route("/").get(validateSchema(getSingleUserSchema), getSingleUser)

/**
 * Exports the user router.
 */
export default router
