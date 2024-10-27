import { createLogger, format, transports } from "winston"
import "winston-mongodb"
import { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports"
import util from "util"
import config from "../config/config"
import { EApplicationEnvironment } from "../constants/application"
import path from "path"
import * as sourceMapSupport from "source-map-support"
import { red, blue, yellow, green, magenta } from "colorette"
import { MongoDBTransportInstance } from "winston-mongodb"

// Linking trace support
sourceMapSupport.install()

const colorizeLevel = (level: string) => {
    switch (level) {
        case "ERROR":
            return red(level)
        case "INFO":
            return blue(level)
        case "WARN":
            return yellow(level)
        default:
            return level
    }
}

const consoleLogFormat = format.printf((info): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { level, message, timestamp, meta = {} } = info

    const customLevel = colorizeLevel(level.toUpperCase())

    const customTimestamp = green(timestamp as string)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const customMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta("META")} ${customMeta}\n`

    return customLog
})
const fileLogFormat = format.printf((info): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { level, message, timestamp, meta = {} } = info

    const logMeta: Record<string, unknown> = {}

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = { name: value.name, message: value.message, trace: value.stack ?? "" }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV !== EApplicationEnvironment.TEST) {
        return [
            new transports.Console({
                level: "info",
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }

    return []
}

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, "../", "../", "logs", `${config.ENV}.log`),
            level: "info",
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}

const mongodbTransport = (): Array<MongoDBTransportInstance> => {
    if (config.ENV != EApplicationEnvironment.TEST) {
        return [
            new transports.MongoDB({
                level: "info",
                db: config.DATABASE_URL as string,
                // metaKey: "meta",
                expireAfterSeconds: 3600 * 24 * 30,
                collection: "application-logs"
            })
        ]
    }
    return []
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...fileTransport(), ...mongodbTransport(), ...consoleTransport()]
})
