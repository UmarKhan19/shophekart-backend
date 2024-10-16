import express, { Application, NextFunction, Request, Response } from "express"
import path from "path"
import globalErrorHandler from "./middlewares/globalErrorHandler.middleware"
import responseMessage from "./constants/responseMessage"
import httpError from "./utils/httpError.util"
import { categoryRouter, fixedProductRouter, healthRouter, productRouter, userRouter } from "./routers"
import helmet from "helmet"
import cors from "cors"
import { ALLOWED_ORIGINS } from "./constants/application"
import Session from "express-session"

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

app.use(
     
    Session({
        name: "siwe-quickstart",
        secret: "siwe-quickstart-secret",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false, sameSite: true }
    })
)

//Routes
app.use("/api/v1/health", healthRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/fixedProduct", fixedProductRouter)
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
