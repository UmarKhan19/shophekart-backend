import express, { Application, NextFunction, Request, Response } from "express"
import path from "path"
import globalErrorHandler from "./middlewares/globalErrorHandler.middleware"
import responseMessage from "./constants/responseMessage"
import httpError from "./utils/httpError.util"
import { healthRouter } from "./routers"
import helmet from "helmet"
import cors from "cors"
import { ALLOWED_ORIGINS } from "./constants/application"

const app: Application = express()

//Middlewares
app.use(helmet())
app.use(
    cors({
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        origin: ALLOWED_ORIGINS,
        credentials: true,
        exposedHeaders: ["Content-Type", "Content-Length", "ETag", "Last-Modified"],
        maxAge: 3600, // cache for 1 hour
        preflightContinue: true
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, "../", "public")))

//Routes
app.use("/api/v1/health", healthRouter)

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
