 
// product.router.ts
import { Router } from "express";
import { validateSchema } from "../middlewares";
import { createProductSchema } from "../validation/product";
import updateProductPriceSchema from "../validation/product/updateProductPrice.product.validation";
import createProduct from "../controllers/product/createProduct.product.controllers";
import updateProductPriceController from "../controllers/product/updateProductPrice.product.controllers";
import deleteProductController from "../controllers/product/deleteProduct.product.controllers";
import getSingleProductController from "../controllers/product/getSingleProduct.product.controller";
import getProductsByCategoryController from "../controllers/product/getProductsByCategory.controller";
import { getSingleProductSchema } from "../validation/product/getSingleProduct.validation";

const router: Router = Router();

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
.post(validateSchema(createProductSchema), createProduct);

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
.patch(validateSchema(updateProductPriceSchema), updateProductPriceController);

router
.route("/:id/delete")
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
.delete(deleteProductController);

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
.get(validateSchema(getSingleProductSchema), getSingleProductController);

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
.get(getProductsByCategoryController);  // Add the new route

/**
* Exports the product router.
*
* Makes the product router available for import and use in other modules.
*
* @returns {Router}
*/
export default router;
