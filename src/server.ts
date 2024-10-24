/* eslint-disable no-console */
import app from "./app"
import { config } from "./config"
// import { initRateLimiter } from "./config/rateLimiter.config"
// import { EApplicationEnvironment } from "./constants/application"
import databaseService from "./services/database.service"
import logger from "./utils/logger.util"

const PORT = config.PORT || 8000;

databaseService.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("app is listening on port " + PORT);
    });
  })
  .catch((error) => {
    logger.error("Error in connecting to database");
    logger.error(error);
  });