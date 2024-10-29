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
import getProductsBySeller from "../controllers/product/getBySeller.product.controller"

const router: Router = Router()

router.route("/:id/update-price").patch(validateSchema(updateProductPriceSchema), updateProductPriceController)

router.route("/all").get(getAllProductsController)

router.route("/:id/delete").delete(deleteProductController)

router.route("/:id").get(validateSchema(getSingleProductSchema), getSingleProductController)

router.route("/by-category/:categoryName").get(getProductsByCategoryController)

router.route("/:id/update-on-chain-id").put(validateSchema(updateProductOnChainIdSchema), updateProductOnChainId)

router.route("/my/seller").get(getProductsBySeller)

export default router
