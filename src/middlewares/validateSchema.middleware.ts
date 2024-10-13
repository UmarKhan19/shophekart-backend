import { Request, Response, NextFunction } from "express"
import { AnyZodObject } from "zod"
import { httpError } from "../utils"

const validate = (schema: AnyZodObject) => (req: Request, _: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body as unknown,
            query: req.query,
            params: req.params
        })
        next()
    } catch (error: unknown) {
        httpError(next, error, req, 400)
    }
}

export default validate
