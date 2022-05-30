import { ArgumentsHost, BadRequestException, ExceptionFilter, Injectable } from "@nestjs/common";
import { Request, Response } from 'express';
import SQL from "sql-template-strings";
import { ConnectionService } from "src/connection/connection.service";
import { TerminalException } from "./TerminalException";

export class TerminalExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly CP
    ){}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (exception instanceof TerminalException) {
            console.log(`message: ${exception.getErrorResult().errorMsg}, code: ${exception.getErrorResult().errorCode}`)
            console.log(request.get('user-agent'))
            console.log(request.ip)
            console.log(request.params)
            console.log(request.body)


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
            console.log(`message: ${errorMsg}, code: ${status}`)
            console.log(request.get('user-agent'))
            console.log(request.ip)
            console.log(request.params)
            console.log(request.body)
            this.CP.SQL(SQL`INSERT INTO ERROR_LOG (CODE, MSG) VALUES (${status}, ${errorMsg})`)

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

export const createTerminalExceptionFilter = (cp) => {
    return new TerminalExceptionFilter(cp)
}
