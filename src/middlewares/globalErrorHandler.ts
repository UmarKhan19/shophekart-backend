import { Request, Response } from "express"
import { IHttpError } from "../types/http.types"

export default (error: IHttpError<null>, _: Request, res: Response): void => {
    res.status(error.statusCode).json(error)
}
