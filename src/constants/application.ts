import config from "../config/config"

export enum EApplicationEnvironment {
    PRODUCTION = "production",
    DEVELOPMENT = "development",
    TEST = "test"
}

export const ALLOWED_ORIGINS: string[] = [config.CLIENT_URL as string]
