import { Body, ConsoleLogger, Controller, ExecutionContext, Get, Headers, Ip, Post, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import {RealIp} from "nestjs-real-ip";
import { Request, Response } from 'express';
import bs58 from "bs58";
import { toCamelCase } from './utils/model';
import BigNumber from 'bignumber.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: Request, @Ip() ip:Express.Request, @Headers() headers:Request, @Session() session:any) {
    const a = ["a","b","b"];
    const b = [];


    return {
      a: a.toString(),
      b: new Array(a.length).fill("?").join(","),
      c: `'${a.toString().replace(/,/g, "','")}'`,
      d: [].map((e:any) => {return toCamelCase(e)}),
      e: b[0],
      f: Object.keys(b).length,
      g: a.includes("a"),
      h: b.includes("ab"),
      i: new BigNumber(0),
      j: new Array(Math.ceil(86400 / 86400)).fill(1),
      k: Math.min(...[1,2,3])
    }
    return await this.appService.getHello();
  }

  @Get("a")
  async a(@Req() req:Request){
    return req.session;
  }

}
