// import dotenvFlow from "dotenv-flow"

// dotenvFlow.config()

import dotenv from "dotenv"

dotenv.config()

export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,

    // Database
    DATABASE_URL: process.env.DATABASE_URL
}
