import { Router } from "express"
import { changeStatus, createOrder, getAllOrdersOfLoggedinUser } from "../controllers/order"
import { validateSchema } from "../middlewares"
import { changeOrderStatusSchema, createOrderSchema } from "../validation/order"

const router = Router()

router.route("/my").get(getAllOrdersOfLoggedinUser)
router.route("/create").post(validateSchema(createOrderSchema), createOrder)
router.route("/update-status").post(validateSchema(changeOrderStatusSchema), changeStatus)

export default router
