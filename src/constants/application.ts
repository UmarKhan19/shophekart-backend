import config from "../config/config"

export enum EApplicationEnvironment {
    PRODUCTION = "production",
    DEVELOPMENT = "development",
    TEST = "test"
}

export const ALLOWED_ORIGINS: string = config.CLIENT_URL as string

export enum ORDER_STATUS {
    PENDING = "pending",
    PROCESSING = "processing",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}

export const ORDER_STATUS_VALUES = [ORDER_STATUS.PENDING, ORDER_STATUS.PROCESSING, ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED] as const
