import { Request } from "express"
import responseMessage from "../constants/responseMessage"
import { config } from "../config"
import { EApplicationEnvironment } from "../constants/application"
import { logger } from "./"
import { IHttpError } from "../types"

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (error: Error | unknown, req: Request, errorStatusCode: number = 500): IHttpError<null> => {
    const errorObj: IHttpError<null> = {
        success: false,
        statusCode: errorStatusCode,
        request: { method: req.method, url: req.originalUrl, ip: req.ip ?? null },
        data: null,
        message: error instanceof Error ? error.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        trace: error instanceof Error ? { error: error.stack } : null
    }

    // Log
    logger.info(`CONTROLLER_ERROR`, {
        meta: errorObj
    })

    // Production ENV check
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }

    return errorObj
}
