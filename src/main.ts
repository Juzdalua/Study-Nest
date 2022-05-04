import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import TerminalExceptionFilter from './exception/terminal.exception.filter';
import { WinstonCreate } from './utils/Logger';
import TerminalValidationPipe from './validation-pipe/terminal-validation-pipe';
import express from "express";
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //use winston
    logger: WinstonCreate()
  });

  //use winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  //use cors
  app.enableCors({
    origin: process.env.CORS_SITES?.split(","),
    optionsSuccessStatus: 200
  });

  //use static folder
  app.use('/public', express.static(join(__dirname, '../public')));

  // use globalFilter
  app.useGlobalFilters(TerminalExceptionFilter)

  //use validator
  app.useGlobalPipes(TerminalValidationPipe);

  await app.listen(process.env.PORT ? process.env.PORT : 3000);

}
bootstrap();
