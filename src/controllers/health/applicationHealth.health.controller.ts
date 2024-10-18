import { NextFunction, Request, Response } from "express"
import responseMessage from "../../constants/responseMessage"
import { httpError, health, httpResponse, asyncHandler } from "../../utils/"

const applicationHealth = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    try {
        const healthData = {
            application: health.getApplicationHealth(),
            timeStamp: Date.now()
        }

        httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("System health"), healthData)
    } catch (error) {
        httpError(next, error, req, 500)
    }
})

export default applicationHealth
