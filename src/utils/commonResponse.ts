import { BadRequestException, HttpException, NotFoundException } from "@nestjs/common";
import { ErrorResult, TerminalException } from "src/exception/TerminalException";
import { toCamelCase } from "./model";

export interface CommonResponse {
    success: boolean,
    result: Array<any> | Object | ErrorResult
}

const commonResponse = {

    success: (data: Array<any> | Object, toCamelize: boolean = true) => {
        const response: CommonResponse = {
            success: true,
            result: data
        }

        if (toCamelize) {
            if (Array.isArray(data)) {
                response.result = data.map(item => toCamelCase(item));
            } else if (typeof data == "object") {
                response.result = toCamelCase(data);
            }
        }

        return response;
    },

    fail: (errorCode: number, errorMsg: string, statusCode: number = 400) => {
        throw new TerminalException({
            errorCode: errorCode,
            errorMsg: errorMsg
        }, statusCode);
    },

    // Deprecated
    ok: (message: string) => {
        const response = {
            success: true,
            result: message
        };
        return response;
    },

    // Deprecated
    notFound: () => {
        throw new TerminalException({
            errorCode: 404,
            errorMsg: "Not Found"
        }, 404);
    },

    // Deprecated
    error: (data: string) => {
        throw new TerminalException({
            errorCode: 400,
            errorMsg: data
        }, 400);
    },
};

export default commonResponse;