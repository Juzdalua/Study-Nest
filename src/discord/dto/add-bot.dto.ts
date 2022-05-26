import { IsString } from "class-validator";

export interface AddBotDTO{
    code: string;
    guild_id: string;
}