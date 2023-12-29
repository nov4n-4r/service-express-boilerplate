import winston from "winston";
import path from "path"
import { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";
import moment from "moment";

const customFormat = winston.format.printf(
    ({
        level, 
        message, 
        service, 
        metadata,
        timestamp
    }) => {
        const format : Array<string> = [
            `${moment(timestamp).format("LLLL")}`,
            `[${level.toUpperCase()}]`,
            service,
            message,
            JSON.stringify(metadata)
        ]

        return format.join("; ")
    }
)

const transports : Array<ConsoleTransportInstance | FileTransportInstance> = [
    new winston.transports.Console()
]

if(process.env.LOG) transports.push(
    new winston.transports.File({
        filename : path.join(process.env.LOG, "error.log"),
        level : "error"
    })
)

if(process.env.LOG) transports.push(
    new winston.transports.File({
        filename : path.join(process.env.LOG, "combine.log"),
        level : "verbose"
    })
)

const logger = winston.createLogger({
    level : "debug",
    format : winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        customFormat
    ),
    defaultMeta : {
        service : "malifax-ticket-microservice"
    },
    transports
})

export default logger