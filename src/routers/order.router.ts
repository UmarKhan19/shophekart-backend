import { Router } from "express"
import { createOrder } from "../controllers/order"
import { validateSchema } from "../middlewares"
import { createOrderSchema } from "../validation/order"

const router = Router()

router.route("/create").post(validateSchema(createOrderSchema), createOrder)

export default router
