import { NextFunction, Request } from "express"
import { errorObject } from "./"

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (next: NextFunction, error: Error | unknown, req: Request, errorStatusCode: number = 500): void => {
    const errorObj = errorObject(error, req, errorStatusCode)
    return next(errorObj)
}
