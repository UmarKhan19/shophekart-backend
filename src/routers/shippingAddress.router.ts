import { Router } from "express"
import ShippingAddressController from "../controllers/shippingAddress"

const router = Router()

router.post("/create", ShippingAddressController.create)
router.get("/:buyerId/addresses", ShippingAddressController.fetchUserShippingAddresses)
router.get("/me", ShippingAddressController.fetchLoggedInUserShippingAddresses)
router.put("/update", ShippingAddressController.updateShippingAddress)
router.delete("/delete", ShippingAddressController.deleteShippingAddress)
router.post("/single", ShippingAddressController.getSingleShippingAddress)

export default router
