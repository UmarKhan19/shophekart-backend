// fixedProduct.route.ts
import express from "express";
import createFixedProductController from "../controllers/product/fixedProduct/fixedProduct.controller";
import { validateSchema } from "../middlewares";
import createFixedProductSchema from "../validation/product/fixedProduct/fixedProduct.product.validation";
import fetchFixedProductController from "../controllers/product/fixedProduct/fetchFixedProduct.controller";
import getSingleFixedProductController from "../controllers/product/fixedProduct/getSingleFixedProduct.controller";
const router = express.Router();

router.route("/create").post(validateSchema(createFixedProductSchema) ,createFixedProductController);
router.route("/getAll").get(fetchFixedProductController);
router.get("/:id", getSingleFixedProductController);

export default router;
