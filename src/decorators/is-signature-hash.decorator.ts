import { buildMessage, ValidateBy, ValidationOptions } from "class-validator";

export const IS_SIGNATURE_HASH = "";

export function isSignatureHash(value: unknown): boolean {
    const signatureMatch = String(value).match(/0x([A-Fa-f0-9]{130}){1}/);
    const signature: string | undefined = signatureMatch?.at(0);
    return signature && String(value).length == 132;
}

export function IsSignatureHash(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_SIGNATURE_HASH,
            constraints: [],
            validator: {
                validate: (value): boolean => isSignatureHash(value),
                defaultMessage: buildMessage(() => `must be a valid signaureHash`, validationOptions),
            }
        },
        validationOptions
    )
};
