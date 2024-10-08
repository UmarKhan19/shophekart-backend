import express, { Application, NextFunction, Request, Response } from "express"
import path from "path"
import globalErrorHandler from "./middlewares/globalErrorHandler"
import responseMessage from "./constants/responseMessage"
import httpError from "./utils/httpError"

const app: Application = express()

//Middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, "../", "public")))

//Routes

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction): void => {
    try {
        throw new Error(responseMessage.NOT_FOUND("route"))
    } catch (error) {
        httpError(next, error, req, 404)
    }
})

// Global Error handler
app.use(globalErrorHandler)

export default app
