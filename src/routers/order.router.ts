import { Router } from "express"
import { createOrder, getAllOrdersOfLoggedinUser } from "../controllers/order"
import { validateSchema } from "../middlewares"
import { createOrderSchema } from "../validation/order"

const router = Router()

router.route("/my").get(getAllOrdersOfLoggedinUser)
router.route("/create").post(validateSchema(createOrderSchema), createOrder)

export default router
