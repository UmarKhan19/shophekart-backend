// product.router.ts
import { Router } from "express"
import { validateSchema } from "../middlewares"
import updateProductPriceSchema from "../validation/product/updateProductPrice.product.validation"
import updateProductPriceController from "../controllers/product/updateProductPrice.product.controllers"
import deleteProductController from "../controllers/product/deleteProduct.product.controllers"
import getSingleProductController from "../controllers/product/getSingleProduct.product.controller"
import getProductsByCategoryController from "../controllers/product/getProductsByCategory.controller"
import { getSingleProductSchema } from "../validation/product/getSingleProduct.validation"
import getAllProductsController from "../controllers/product/getAllProduct.product.controller"
import updateProductOnChainId from "../controllers/product/updateOnChainId.product.controller"
import { updateProductOnChainIdSchema } from "../validation/product"
import searchProductController from "../controllers/product/searchProduct.controller"

const router: Router = Router()

router
    .route("/:id/update-price")
    /**
     * Handles product price updates.
     *
     * This route validates the incoming request body against the `updateProductPriceSchema`
     * and then calls the `updateProductPrice` controller to complete the update process.
     *
     * @route PATCH /:id/update-price
     * @access public
     * @uses Middleware validateSchema to validate the request body against the `updateProductPriceSchema`.
     * @uses Controller updateProductPrice to handle the update process.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    .patch(validateSchema(updateProductPriceSchema), updateProductPriceController)
/**
 * @api {GET} /products
 * @description Fetch all products
 * @returns {IProductDocument[]} products - List of products
 * @throws {Error} If failed to get products
 */
router.route("/search").get(searchProductController)
router.route("/all").get(getAllProductsController)
router.route("/:id/delete")
    /**
     * Deletes a product.
     *
     * This route deletes a product by its ID.
     *
     * @route DELETE /:productId/delete
     * @access public
     * @uses Controller deleteProduct to handle the deletion process.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    .delete(deleteProductController)

router
    .route("/:id")
    /**
     * Retrieves a single product.
     *
     * This route validates the incoming request params against the `getSingleProductSchema`
     * and then calls the `getSingleProductController` controller to complete the retrieval process.
     *
     * @route GET /:id
     * @access public
     * @uses Middleware validateSchema to validate the request params against the `getSingleProductSchema`.
     * @uses Controller getSingleProductController to handle the retrieval process.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    .get(validateSchema(getSingleProductSchema), getSingleProductController)

router
    .route("/by-category/:categoryName")
    /**
     * Retrieves products by category.
     *
     * This route retrieves products by their category name.
     *
     * @route GET /by-category/:categoryName
     * @access public
     * @uses Controller getProductsByCategory to handle the retrieval process.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Promise<void>}
     */
    .get(getProductsByCategoryController) // Add the new route

router.route("/:id/update-on-chain-id").put(validateSchema(updateProductOnChainIdSchema), updateProductOnChainId)

/**
 * Exports the product router.
 *
 * Makes the product router available for import and use in other modules.
 *
 * @returns {Router}
 */
export default router
