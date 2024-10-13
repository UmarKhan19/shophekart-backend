import { Request } from "express"
import responseMessage from "../constants/responseMessage"
import { config } from "../config"
import { EApplicationEnvironment } from "../constants/application"
import { logger } from "./"
import { IHttpError } from "../types"
import { ZodError } from "zod"

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (error: Error | unknown, req: Request, errorStatusCode: number = 500): IHttpError<null> => {
    const errorObj: IHttpError<null> = {
        success: false,
        statusCode: errorStatusCode,
        request: { method: req.method, url: req.originalUrl, ip: req.ip ?? null },
        data: null,
        message:
            error instanceof ZodError
                ? error.errors[0].message
                : error instanceof Error
                  ? error.message || responseMessage.SOMETHING_WENT_WRONG
                  : responseMessage.SOMETHING_WENT_WRONG,
        trace: error instanceof Error ? { error: error.stack } : null
    }

    // Log
    if (config.ENV != EApplicationEnvironment.TEST) {
        logger.info(`CONTROLLER_ERROR`, {
            meta: errorObj
        })
    }

    // Production ENV check
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }

    return errorObj
}
