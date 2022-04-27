import { ArgumentsHost, BadRequestException, ExceptionFilter } from "@nestjs/common";
import { Response } from 'express';
import { TerminalException } from "./TerminalException";

export class TerminalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log(exception)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof TerminalException) {
            response.status(exception.getStatus()).json({
                success: false,
                result: exception.getErrorResult()
            })
        } else {
            let status =  400;
            if(typeof exception.getStatus === 'function') {
                status = exception.getStatus()
            }
            let errorMsg = exception.message;

            if (exception.response && exception.response.message) {
                if (exception.message && Array.isArray(exception.response.message)) {
                    errorMsg = exception.response.message.join(", ");
                }
            }

            response
                .status(status)
                .json({
                    success: false,
                    result: {
                        errorCode: status,
                        errorMsg: errorMsg
                    }
                });
        }


    }
}

export default new TerminalExceptionFilter()