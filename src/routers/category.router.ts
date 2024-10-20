// category.route.ts

import { Router } from "express";
import { validateSchema } from "../middlewares";

// Import the validation schema for creating a category
import createCategorySchema from "../validation/category/createCategory.category.validation";

// Import the controller for creating a category
import createCategoryController from "../controllers/category/category.controller";
import getCategoriesController from "../controllers/category/getCategories.controller";

const categoryRouter: Router = Router();

/**
 * Creates a new category.
 *
 * @route POST /create
 * @access public
 * @uses Middleware validateSchema to validate the request body against the `createCategorySchema`.
 * @uses Controller createCategory to handle the creation process.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
categoryRouter.post(
  "/create",
  validateSchema(createCategorySchema),
  createCategoryController
);
categoryRouter.get(
  "/all",
  getCategoriesController
)
export default categoryRouter;
