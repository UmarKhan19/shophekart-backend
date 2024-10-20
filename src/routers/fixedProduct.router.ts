/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// routes/product/fixedProduct.route.ts
import express from "express";
import createFixedProductController from "../controllers/product/fixedProduct/fixedProduct.controller";
import { validateSchema } from "../middlewares";
import createFixedProductSchema from "../validation/product/fixedProduct/fixedProduct.product.validation";
import fetchFixedProductController from "../controllers/product/fixedProduct/fetchFixedProduct.controller";
import getSingleFixedProductController from "../controllers/product/fixedProduct/getSingleFixedProduct.controller";
import { getSingleProductSchema } from "../validation/product/fixedProduct/getSingleProductValidation";
import upload from "../middlewares/multer.middleware";


const router = express.Router();

router.route("/create").post(upload.array("images", 5), validateSchema(createFixedProductSchema), createFixedProductController); 
router.route("/getAll").get(fetchFixedProductController);
router.get("/:id", validateSchema(getSingleProductSchema), getSingleFixedProductController);

export default router;
