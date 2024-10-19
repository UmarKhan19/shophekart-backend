import { Router } from "express"
import { changeStatus, createOrder, getAllOrdersOfLoggedinUser, getSingleOrder } from "../controllers/order"
import { validateSchema } from "../middlewares"
import { changeOrderStatusSchema, createOrderSchema, getSingleOrderSchema } from "../validation/order"

const router = Router()

router.route("/my").get(getAllOrdersOfLoggedinUser)
router.route("/single/:id").get(validateSchema(getSingleOrderSchema), getSingleOrder)
router.route("/create").post(validateSchema(createOrderSchema), createOrder)
router.route("/update-status").post(validateSchema(changeOrderStatusSchema), changeStatus)

export default router
