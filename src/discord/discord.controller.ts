import { Controller, Get, Query, Redirect } from '@nestjs/common';
import Axios from "axios";
import { DiscordService } from './discord.service';
import { AddBotDTO } from './dto/add-bot.dto';

@Controller('discord')
export class DiscordController {
    constructor(
        private discordService: DiscordService,
    ){}

    @Get("")
    @Redirect()
    async discordHome(){
        return {
            url: `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURI(String(process.env.DISCORD_REDIRECT_SIGNIN))}&response_type=code&scope=identify%20guilds`
        }
    }

    @Get("/addbot")
    @Redirect()
    async discordbot(){
        return {
            url: `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&permissions=8&redirect_uri=${encodeURI(String(process.env.DISCORD_REDIRECT_ADD_BOT))}&response_type=code&scope=guilds%20bot%20applications.commands`
        }
    }

    @Get("/signin")
    async discordSignin(@Query() query:any){

        // Get Access Token
        const params: any = {
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            code: query.code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.DISCORD_REDIRECT_SIGNIN,
            scope: 'identify guilds bot',
        }
        const urlSearchParams = new URLSearchParams(params);
        const result = await Axios.post('https://discord.com/api/oauth2/token', urlSearchParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        const discordAccessToken = result.data.access_token;

        // Get Discord User Info
        if (discordAccessToken != undefined) {
            const myInfo: any = await await Axios.get('https://discord.com/api/users/@me', { headers: { 'Authorization': `Bearer ${discordAccessToken}` } })
            const me = myInfo.data;

            const discordUserId = me.id;
            const discordUserNick = me.username;
            const discordUserAvatar = me.avatar;
            console.log(me)

            // const authInfo = await User.signInWithDiscord(discordAccessToken, discordUserId, discordUserNick, discordUserAvatar)

            // Get DIscord Guild
            const guildInfo = await Axios.get('https://discord.com/api/users/@me/guilds', { headers: { 'Authorization': `Bearer ${discordAccessToken}` } })
            const guilds = guildInfo.data.filter((e: any) => parseInt(e.permissions).toString(2).slice(-4)[0] == "1")
            return {
                me, guilds
            }
          }

        return;
    }

    @Get("/bot")
    async discordBotAdd(@Query() query:AddBotDTO){

        // Get Access Token
        const params: any = {
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            code: query.code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.DISCORD_REDIRECT_ADD_BOT,
            scope: 'identify guilds bot',
        }

        const urlSearchParams = new URLSearchParams(params);
        const result = await Axios.post('https://discord.com/api/oauth2/token', urlSearchParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        const discordAccessToken = result.data.access_token;

        // Get Discord User Info
        if (discordAccessToken != undefined) {
            const myInfo: any = await await Axios.get('https://discord.com/api/users/@me', { headers: { 'Authorization': `Bearer ${discordAccessToken}` } })
            const me = myInfo.data;

            const discordUserId = me.id;
            const discordUserNick = me.username;
            const discordUserAvatar = me.avatar;
            console.log(me)

            // const authInfo = await User.signInWithDiscord(discordAccessToken, discordUserId, discordUserNick, discordUserAvatar)

            // Get DIscord Guild
            const guildInfo = await Axios.get('https://discord.com/api/users/@me/guilds', { headers: { 'Authorization': `Bearer ${discordAccessToken}` } })
            const guilds = guildInfo.data.filter((e: any) => parseInt(e.permissions).toString(2).slice(-4)[0] == "1")
            return {
                me, guilds
            }
          }


        return query
    }

};
