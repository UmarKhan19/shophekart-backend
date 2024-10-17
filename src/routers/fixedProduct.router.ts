// fixedProduct.route.ts
import express from "express";
import createFixedProductController from "../controllers/product/fixedProduct/fixedProduct.controller";
import { validateSchema } from "../middlewares";
import createFixedProductSchema from "../validation/product/fixedProduct/fixedProduct.product.validation";
const router = express.Router();

router.route("/create").post(validateSchema(createFixedProductSchema) ,createFixedProductController);

export default router;
