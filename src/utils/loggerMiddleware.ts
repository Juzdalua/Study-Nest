import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { WinstonModule } from "nest-winston";
import Winston from "winston"
import WinstonDaily from "winston-daily-rotate-file"

//class
@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    private logger = new Logger('HTTP');
    use(req: Request, res: Response, next: NextFunction){
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';

        res.on('finish', () => {
        const { statusCode } = res;
        const contentLength = res.get('content-length');

        this.logger.log(
            `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );
        });
        next();
    }
}

//functional middleware -> 종속성이 필요 없을 경우 기능적 미들웨어 대안을 사용하는게 좋음.
//useage: main.ts -> app.use(logger) / app.modules.ts -> apply(logger)
export function logger(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('HTTP');
    const { ip, method, originalUrl } = req;
    const origin = req.get('origin');
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
    const { statusCode } = res;
    const contentLength = res.get('content-length');

    logger.log(
        // `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        `${method} ${originalUrl} ${statusCode} - ${origin} ${userAgent} ${ip}`,
        );
    });
  next();
};

//winston class
const { combine, timestamp, printf } = Winston.format;
const logFormat = printf(info => {
    return `[${info.timestamp}] [${info.level}] : ${info.message}`;
});

@Injectable()
export class WinstonLogger implements NestMiddleware{
    public logger?: Winston.Logger

    use(): WinstonLogger {
        this.logger = Winston.createLogger({
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
                }),
            ]
        })

        this.logger.add(new Winston.transports.Console({
            format: Winston.format.combine(
                Winston.format.colorize(),
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                logFormat,
            )
        }));

        return this;
    }

}

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