import { ArgumentMetadata, ValidationPipe } from "@nestjs/common"

export class TerminalValidationPipe extends ValidationPipe {
    constructor() {
        super({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    }

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        return super.transform(value, metadata)
    }
}

export default new TerminalValidationPipe()