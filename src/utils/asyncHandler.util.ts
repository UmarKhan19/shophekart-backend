import { NextFunction, Request, Response } from "express"
import { httpError } from "."

export default function asyncHandler(hander: (req: Request, res: Response, next: NextFunction) => void | Promise<void>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await hander(req, res, next)
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }
}
