import { Router } from "express"
import { validateSchema } from "../middlewares"
import { registerUserSchema } from "../validation/user"
import { registerUser } from "../controllers/user"

const router = Router()

router.route("/register").post(validateSchema(registerUserSchema), registerUser)

export default router
