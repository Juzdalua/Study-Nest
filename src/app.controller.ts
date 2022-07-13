import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async home(){
    const arr = [1,2,3,4];

    console.log(arr.at(-1));
    console.log(arr[arr.length-1])
    return ;

  }

}
