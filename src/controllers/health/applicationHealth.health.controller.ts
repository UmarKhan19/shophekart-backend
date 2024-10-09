import { NextFunction, Request, Response } from "express"
import httpResponse from "../../utils/httpResponse"
import responseMessage from "../../constants/responseMessage"
import httpError from "../../utils/httpError"
import health from "../../utils/health"

const applicationHealth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const healthData = {
            application: health.getApplicationHealth(),
            timeStamp: Date.now()
        }

        httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION, healthData)
    } catch (error) {
        httpError(next, error, req, 500)
    }
}

export default applicationHealth
