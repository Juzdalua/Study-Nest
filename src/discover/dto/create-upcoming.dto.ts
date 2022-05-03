import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateUpcomingDTO{
    @IsString()
    readonly COLLECTION_NAME: string;

    @IsOptional()
    @IsString()
    readonly CONTRACT_ADDRESS: string;

    @IsOptional()
    @IsString()
    readonly CATEGORY: string;

    @IsOptional()
    @IsString()
    readonly DESCRIPTION_SHORT: string;

    @IsOptional()
    @IsString()
    readonly DESCRIPTION_LONG: string;

    @IsOptional()
    @IsString()
    readonly EMAIL: string = null;

    @IsOptional()
    @IsDate()
    @Type(()=>Date)
    readonly DUE_DATE: Date = null;

    @IsOptional()
    @IsString()
    readonly WEBSITE_URL: string;

    @IsOptional()
    @IsString()
    readonly BIO_URL: string;

    @IsOptional()
    @IsString()
    readonly DISCORD_URL: string;

    @IsOptional()
    @IsString()
    readonly TWITTER_URL: string;

    @IsOptional()
    @IsString()
    readonly IMAGE_URL: string;

    @IsOptional()
    readonly IMAGE: Express.Multer.File;

    @IsOptional()
    @IsString()
    readonly MARKET_URL: string;

    @IsOptional()
    @IsInt()
    readonly MAX_SUPPLY: string;

    @IsOptional()
    @IsString()
    readonly MINT_PRICE: string = null;

    @IsOptional()
    @IsString()
    readonly MINT_TYPE: string;

    @IsInt()
    readonly DECIMALS: number = 18;

    @IsOptional()
    @IsString()
    readonly NETWORK: string = "ETH";

    @IsOptional()
    @IsInt()
    readonly DISCORD_BOT: number;

    @IsOptional()
    @IsString()
    readonly ROADMAP_DESCRIPTION: string;

    @IsOptional()
    @IsString()
    readonly PAYMENT_TOKEN: string;

    @IsOptional()
    @IsString()
    readonly TOKEN_STANDARD: string;

    @IsOptional()
    @IsString()
    readonly MARKETING_EVENT: string;

    @IsOptional()
    @IsInt()
    readonly PRIORITY: number;
}