import { utilities, WinstonModule } from "nest-winston";
import Winston from "winston";
import WinstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, printf } = Winston.format;
const logFormat = printf(info => {
    return `[${info.timestamp}] [${info.level}] : ${info.message}`;
});
//winston function
export const WinstonCreate = () => {
    return WinstonModule.createLogger({
        format: combine(
            Winston.format.colorize(),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            logFormat,
        ),
        transports: [
            new WinstonDaily({
                level: 'info',
                datePattern: "YYYY-MM-DD",
                dirname: "logs",
                filename: "%DATE%.log",
                maxFiles: 7,
                zippedArchive: true
            }),
            new WinstonDaily({
                level: 'error',
                datePattern: "YYYY-MM-DD",
                dirname: "logs",
                filename: "%DATE%.error.log",
                maxFiles: 7,
                zippedArchive: true
            })
        ]
    })
}

export const WinstonTransports = () => {
    return new Winston.transports.Console({
        format: Winston.format.combine(
            Winston.format.colorize(),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            logFormat,
        )
    })
};

// Winston.stream = {
//     write:
// }