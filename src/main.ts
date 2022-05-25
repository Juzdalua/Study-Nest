import { NestFactory } from '@nestjs/core';
import express from "express";
import session from 'express-session';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { join } from 'path';
import { AppModule } from './app.module';
import TerminalExceptionFilter from './exception/terminal.exception.filter';
import { WinstonCreate } from './utils/Logger';
import TerminalValidationPipe from './validation-pipe/terminal-validation-pipe';

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

  //use session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      // resave: false,
      // saveUninitialized: false,
  }));

  //use static folder
  app.use('/public', express.static(join(__dirname, '../public')));

  // use globalFilter
  app.useGlobalFilters(TerminalExceptionFilter)

  //use validator
  app.useGlobalPipes(TerminalValidationPipe);

  await app.listen(process.env.PORT ? process.env.PORT : 3000);

}
bootstrap();
