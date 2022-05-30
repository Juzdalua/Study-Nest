import { NestFactory } from '@nestjs/core';
import express from "express";
import session from 'express-session';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { join } from 'path';
import { AppModule } from './app.module';
import { createTerminalExceptionFilter } from './exception/terminal.exception.filter';
import { WinstonCreate } from './utils/Logger';
import TerminalValidationPipe from './validation-pipe/terminal-validation-pipe';
import connectionPool from "mysql2/promise";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //use winston
    logger: WinstonCreate()
  });

  const cp = connectionPool.createPool({
    host: process.env.MYSQL_HOST as string,
    user: process.env.MYSQL_USER as string,
    password: process.env.MYSQL_PASSWORD as string,
    port: parseInt(process.env.MYSQL_PORT as string) ?? 3306,
    database: process.env.MYSQL_DATABASE as string,
    connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT as string) ?? 50
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
  app.useGlobalFilters(createTerminalExceptionFilter(cp))

  //use validator
  app.useGlobalPipes(TerminalValidationPipe);

  await app.listen(process.env.PORT ? process.env.PORT : 3000);

}
bootstrap();
