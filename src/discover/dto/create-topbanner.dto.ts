import { IsInt, IsJSON, IsOptional, IsString } from "class-validator";
import { IsAddress } from "src/decorators/is-address.decorator";

export class CreateTopbannerDTO{
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsAddress()
    readonly contractAddress: string;

    @IsOptional()
    @IsString()
    readonly imageUrl: string;

    @IsOptional()
    @IsString()
    readonly videoUrl: string;

    @IsOptional()
    @IsJSON()
    readonly btns: JSON;

    @IsOptional()
    @IsJSON()
    readonly styles: JSON;

    @IsOptional()
    @IsInt()
    readonly priority: number;
}