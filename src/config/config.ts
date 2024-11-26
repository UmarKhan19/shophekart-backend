import dotenvFlow from "dotenv-flow"

dotenvFlow.config()

export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    EMAIL: process.env.EMAIL,
    EMAIL_USER: process.env.EMAIL_USER,
    PASSWORD: process.env.PASSWORD,

    // Database
    DATABASE_URL: process.env.DATABASE_URL
}
