
export interface ErrorResult {
    errorCode: number,
    errorMsg: string
}

export class TerminalException extends Error {
    private statusCode: number = 400
    private errorResult: ErrorResult;

    constructor(errorResult: ErrorResult, statusCode?: number) {
        super(undefined)
        this.errorResult = errorResult;
        this.statusCode = statusCode;
    }

    getStatus(): number {
        return this.statusCode
    }

    getErrorResult(): ErrorResult {
        return this.errorResult
    }
}