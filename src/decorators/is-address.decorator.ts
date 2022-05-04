import { buildMessage, ValidateBy, ValidationOptions } from "class-validator";

export const IS_ADDRESS = "";

export function isAddress(value: unknown): boolean {
    const addressMatch = String(value).match(/0x([A-Fa-f0-9]{40}){1}/);
    const address: string | undefined = addressMatch?.at(0);
    return address && (String(value).length == 40 || String(value).length == 42);
}

export function IsAddress(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_ADDRESS,
            constraints: [],
            validator: {
                validate: (value): boolean => isAddress(value),
                defaultMessage: buildMessage(() => `must be a valid address`, validationOptions),
            }
        },
        validationOptions
    )
};
