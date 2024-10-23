// routes/product/fixedProduct.route.ts
import express from "express"
import createFixedProductController from "../controllers/product/fixedProduct/fixedProduct.controller"
import { validateSchema } from "../middlewares"
// import createFixedProductSchema from "../validation/product/fixedProduct/fixedProduct.product.validation";
import fetchFixedProductController from "../controllers/product/fixedProduct/fetchFixedProduct.controller"
import getSingleFixedProductController from "../controllers/product/fixedProduct/getSingleFixedProduct.controller"
import { getSingleProductSchema } from "../validation/product/fixedProduct/getSingleProductValidation"
import upload from "../middlewares/multer.middleware"

const router = express.Router()
router.route("/search").get(searchProductController)

router.route("/create").post(upload.array("images", 5), createFixedProductController)
router.route("/getAll").get(fetchFixedProductController)
router.route("/:id").get(validateSchema(getSingleProductSchema), getSingleFixedProductController)

export default router
