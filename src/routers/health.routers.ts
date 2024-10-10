import { Router } from "express"
import { applicationHealth, overallHealth, systemHealth } from "../controllers/health"

const router = Router()

router.route("/").get(overallHealth)
router.route("/system").get(systemHealth)
router.route("/application").get(applicationHealth)

export default router
