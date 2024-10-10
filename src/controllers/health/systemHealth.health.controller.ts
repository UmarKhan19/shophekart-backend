import { NextFunction, Request, Response } from "express"
import responseMessage from "../../constants/responseMessage"
import { httpError, health, httpResponse, asyncHandler } from "../../utils/"

const systemHealth = asyncHandler( (req: Request, res: Response, next: NextFunction) => {
    try {
        const healthData = {
            system: health.getSystemHealth(),
            timeStamp: Date.now()
        }

        httpResponse(req, res, 200, responseMessage.SUCCESSFUL_OPERATION, healthData)
    } catch (error) {
        httpError(next, error, req, 500)
    }
})

export default systemHealth
