import { Type } from "class-transformer";
import { IsDate, IsInt, IsJSON, IsOptional, IsString, IsUrl } from "class-validator";
import { IsAddress } from "src/decorators/is-address.decorator";

export class CreateUpcomingDTO{
    @IsString()
    readonly collectionName: string;

    @IsOptional()
    @IsAddress()
    readonly contractAddress: string;

    @IsOptional()
    @IsString()
    readonly category: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly roadmapDescription: string;

    @IsOptional()
    @IsDate()
    @Type(()=>Date)
    readonly dueDate: Date = null;

    @IsOptional()
    @IsString()
    readonly email: string = null;

    @IsOptional()
    @IsUrl()
    readonly imageUrl: string;

    @IsOptional()
    @IsUrl()
    readonly websiteUrl: string;

    @IsOptional()
    @IsUrl()
    readonly bioUrl: string;

    @IsOptional()
    @IsUrl()
    readonly discordUrl: string;

    @IsOptional()
    @IsUrl()
    readonly twitterUrl: string;

    @IsOptional()
    @IsUrl()
    readonly marketUrl: string;

    @IsOptional()
    @IsInt()
    readonly maxSupply: string;

    @IsOptional()
    @IsString()
    readonly mintPrice: string = null;

    @IsOptional()
    @IsString()
    readonly mintType: string;

    @IsInt()
    readonly decimals: number = 18;

    @IsOptional()
    @IsString()
    readonly network: string = "ETH";

    @IsOptional()
    @IsInt()
    readonly discordBot: number;

    @IsOptional()
    @IsString()
    readonly marketingEvent: string;

    @IsOptional()
    @IsJSON()
    readonly marketImage: JSON;

    @IsOptional()
    @IsInt()
    readonly priority: number;
}