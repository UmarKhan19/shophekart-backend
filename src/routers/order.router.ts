import { Router } from "express"
import {
    changeStatus,
    createOrder,
    deleteOrder,
    getBuyerOrderHistory,
    getSellerOrderHistory,
    getSingleOrder,
    getSoldItemsOfLoggedInUser,
    updateNftId
} from "../controllers/order"
import { validateSchema } from "../middlewares"
import { changeOrderStatusSchema, deleteOrderSchema, getSingleOrderSchema, updateNftidSchema } from "../validation/order"

const router = Router()

router.route("/my/seller").get(getSellerOrderHistory)
router.route("/my/buyer").get(getBuyerOrderHistory)
router.route("/single/:orderId").get(validateSchema(getSingleOrderSchema), getSingleOrder)
router.route("/my/sold-items").get(getSoldItemsOfLoggedInUser)
router.route("/create").post(createOrder)
router.route("/update-status").put(validateSchema(changeOrderStatusSchema), changeStatus)
router.route("/update-nft-id").put(validateSchema(updateNftidSchema), updateNftId)
router.route("/:orderId").delete(validateSchema(deleteOrderSchema), deleteOrder)

export default router
