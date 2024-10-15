// src/routers/product.router.ts

/**
 * Product Routes
 *
 * This module exports a router that handles product-related routes.
 *
 * @module routers/product.router
 */

import { Router } from "express"
import { validateSchema } from "../middlewares"
import { createProductSchema } from "../validation/product"
import createProduct from "../controllers/product/createProduct.product.controllers"

/**
 * Product router.
 *
 * Manages product-related routes and operations.
 *
 * @type {Router}
 */
const router: Router = Router()

/**
 * Creates a new product.
 *
 * This route validates the incoming request body against the `createProductSchema`
 * and then calls the `createProduct` controller to complete the creation process.
 *
 * @route POST /create
 * @access public
 * @uses Middleware validateSchema to validate the request body against the `createProductSchema`.
 * @uses Controller createProduct to handle the creation process.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
router
  .route("/create")
  /**
   * Handles new product creation requests.
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Promise<void>}
   */
  .post(validateSchema(createProductSchema), createProduct)

/**
 * Exports the product router.
 *
 * Makes the product router available for import and use in other modules.
 *
 * @returns {Router}
 */
export default router
