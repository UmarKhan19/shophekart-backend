import config from "../config/config"

export enum EApplicationEnvironment {
    PRODUCTION = "production",
    DEVELOPMENT = "development"
}

export const ALLOWED_ORIGINS: string[] = [config.CLIENT_URL as string]
