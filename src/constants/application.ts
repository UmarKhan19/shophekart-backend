import config from "../config/config"

export enum EApplicationEnvironment {
    PRODUCTION = "production",
    DEVELOPMENT = "development",
    TEST = "test"
}

export const ALLOWED_ORIGINS: string = config.CLIENT_URL as string

export enum ORDER_STATUS {
    AWAITING_SHIPMENT = "pending",
    AWAITING_DELIVERY = "delivering",
    COMPLETE = "delivered",
    CANCEL = "cancelled",
    DISPUTE = "dispute"
}

export const ORDER_STATUS_VALUES = [
    ORDER_STATUS.AWAITING_SHIPMENT,
    ORDER_STATUS.AWAITING_DELIVERY,
    ORDER_STATUS.COMPLETE,
    ORDER_STATUS.CANCEL,
    ORDER_STATUS.DISPUTE
] as const
