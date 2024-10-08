import app from "./app"
import config from "./config/config"
import logger from "./utils/logger"

const server = app.listen(config.PORT)
;(() => {
    try {
        // Database connection
        logger.info(`APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (error) {
        logger.error(`APPLICATION_CLOSED`, {
            meta: { error }
        })
        server.close((error) => {
            if (error) {
                logger.error(`APPLICATION_CLOSED`, {
                    meta: { error }
                })
            }
            process.exit(1)
        })
    }
})()
