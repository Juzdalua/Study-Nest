import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { isAddress } from "src/decorators/is-address.decorator";

@Injectable()
class AddressValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (isAddress(value)) {
            return value;
        } else {
            throw new BadRequestException("must be a valid address");
        }
    }
}

export const AddressValidation = new AddressValidationPipe()