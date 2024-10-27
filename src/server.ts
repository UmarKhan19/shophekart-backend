import app from "./app"
import { config } from "./config"
import { initRateLimiter } from "./config/rateLimiter.config"
import { EApplicationEnvironment } from "./constants/application"
import databaseService from "./services/database.service"
import logger from "./utils/logger.util"

const server = app.listen(config.PORT ?? 8080)
// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
    try {
        // Database connection
        const connection = await databaseService.connect()
        if (config.ENV != EApplicationEnvironment.TEST) {
            logger.info(`DATABASE_CONNECTION`, {
                meta: {
                    CONNECTION_NAME: connection.name
                }
            })
        }

        initRateLimiter(connection)
        if (config.ENV != EApplicationEnvironment.TEST) {
            logger.info(`RATE_LIMITER_INITIATED`)
            logger.info(`APPLICATION_STARTED`, {
                meta: {
                    PORT: config.PORT,
                    SERVER_URL: config.SERVER_URL
                }
            })
        }
    } catch (error) {
        if (config.ENV != EApplicationEnvironment.TEST) {
            logger.error(`APPLICATION_CLOSED`, {
                meta: { error }
            })
        }
        server.close((error) => {
            if (error && config.ENV != EApplicationEnvironment.TEST) {
                logger.error(`APPLICATION_CLOSED`, {
                    meta: { error }
                })
            }
            process.exit(1)
        })
    }
})()
