import { Router } from "express"
import { validateSchema } from "../middlewares"
import { getSingleUserSchema, registerUserSchema } from "../validation/user"
import { registerUser, getSingleUser, getNonce, SiweAuthController, getProfile, logout } from "../controllers/user"
import verifyNonceParamsSchema from "../validation/user/verifyNonce.user.validation"

const router: Router = Router()

router.route("/register").post(validateSchema(registerUserSchema), registerUser)

router.route("/").get(validateSchema(getSingleUserSchema), getSingleUser)

router.route("/nonce").get(getNonce)

router.route("/proile").get(getProfile)

router.route("/verify").post(validateSchema(verifyNonceParamsSchema), SiweAuthController)

router.route("/logout").post(logout)

export default router
