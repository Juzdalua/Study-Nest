import { Controller, Get, HttpCode, Next, Post, Query, Redirect, Session, UseGuards } from '@nestjs/common';
import BigNumber from "bignumber.js";
import { NextFunction } from 'express';
import Twit from 'twit';
import twitterSignIn from "twittersignin";
import Web3 from 'web3';
import { AppService } from './app.service';
import { RecaptchaGuard } from './auth/recaptcha.guard';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    ) {
  }

  public Twitter = twitterSignIn({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET_KEY,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  @Get("/")
  async home(){
    const arr = [ 1,2,3,4,5,9,10,80,96, 97];

    arr.forEach((e:number) => {
      if(e === 2)
        return false;
      console.log(e)
    });

    arr.every((e:number) => {
      if(e === 2)
        return false;
      console.log(e)
    });

    return ;
  }

  @Get("/test")
  async test(){

    return {

    }
  }

  @Get("/favicon.ico")
  @HttpCode(204)
  ignoreFavicon(@Next() next:NextFunction){
    console.log("^.^")
    next();
  }

  @Get("/eth")
  @Redirect()
  async getHello(@Query() query: any, @Session() session: Record<string, any>) {

    // get ETH
    const web3 = new Web3(process.env.WEB3_PROVIDER_INFURA);
    const address = '0x3923272F19060F511629e46Fc18a0a24D279c9e6';

    const eth = await web3.eth.getBalance(address);
    const result = new BigNumber(eth).dividedBy(Math.pow(10, 18)).toString(10)+" ETH";

    // get twitter API
    // const oauthApi = `https://api.twitter.com/oauth/request_token?oauth_callback=${process.env.TWITTER_REDIRECT_URL}`;
    // const response = await axios.post(oauthApi, {
    //   headers: {
    //     "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    //   }
    // });
    // console.log(response.data)

    // https://github.com/shalvah/twittersignin


    const response = await this.Twitter.getRequestToken({
      oauth_callback: process.env.TWITTER_REDIRECT_URL,
      x_auth_access_type: "read",
    });
    session.requestTokenSecret = response.oauth_token_secret;

    return {
      url: `https://api.twitter.com/oauth/authorize?oauth_token=${response.oauth_token}`
    }



    return {result};
    return await this.appService.getHello();
  }

  @Get("/twitter/oauth/token")
  async getRequestToken(@Query() query:any, @Session() session: Record<string, any>){
    const {oauth_token, oauth_verifier} = query;

    const response = await this.Twitter.getAccessToken(oauth_token, session.requestTokenSecret, oauth_verifier);
    session.accessToken = response.oauth_token;
    session.accessTokenSecret = response.oauth_token_secret;
    session.userId = response.user_id;
    session.userName = response.screen_name;

    // const user = this.Twitter.getUser(response.oauth_token,response.oauth_token_secret)

    const twit = new Twit({
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET_KEY,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    const result = await twit.get('friendships/show', {source_id: '1509795480015802373', target_screen_name: 'OG_XYZ'});
    return result.data;
  };

  @UseGuards(RecaptchaGuard)
  @Post("1")
  async recaptchaTest(){
    return ;
  }
}
