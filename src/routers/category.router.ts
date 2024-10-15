// category.route.ts
import  { Router } from "express";
import { validateSchema } from "../middlewares";
import createCategorySchema from "../validation/category/createCategory.category.validation";
import createCategoryController from "../controllers/category/category.controller";

const categoryRoute = Router();

categoryRoute.post(
  "/create",
  validateSchema(createCategorySchema),
  createCategoryController
);

export default categoryRoute;
