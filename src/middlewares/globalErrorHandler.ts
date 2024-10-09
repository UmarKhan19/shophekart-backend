import { NextFunction, Request, Response } from "express"
import { IHttpError } from "../types/http.types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: IHttpError<null>, _: Request, res: Response, __: NextFunction): void => {
    res.status(error.statusCode).json(error)
}
