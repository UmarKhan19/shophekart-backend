import { NextFunction, Request, Response } from "express"
import httpResponse from "../../utils/httpResponse"
import responseMessage from "../../constants/responseMessage"
import httpError from "../../utils/httpError"
import health from "../../utils/health"

const systemHealth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const healthData = {
            system: health.getSystemHealth(),
            timeStamp: Date.now()
        }

        httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION, healthData)
    } catch (error) {
        httpError(next, error, req, 500)
    }
}

export default systemHealth
