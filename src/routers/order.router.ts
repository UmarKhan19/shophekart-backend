/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express"
import {
    changeStatus,
    createOrder,
    deleteOrder,
    getAllOrdersOfLoggedinUser,
    getSellerOrderHistory,
    getSingleOrder,
    updateNftId
} from "../controllers/order"
import { validateSchema } from "../middlewares"
import { changeOrderStatusSchema,  deleteOrderSchema, getSingleOrderSchema, updateNftidSchema } from "../validation/order"

const router = Router()

router.route("/my/buyer").get(getAllOrdersOfLoggedinUser)
router.route("/my/seller").get(getSellerOrderHistory)
router.route("/single/:id").get(validateSchema(getSingleOrderSchema), getSingleOrder)
router.route("/create").post( createOrder)
router.route("/update-status").put(validateSchema(changeOrderStatusSchema), changeStatus)
router.route("/update-nft-id").put(validateSchema(updateNftidSchema), updateNftId)
router.route("/:orderId").delete(validateSchema(deleteOrderSchema), deleteOrder)
// router.route("/update-status").post(validateSchema(changeOrderStatusSchema), changeStatus)

export default router
