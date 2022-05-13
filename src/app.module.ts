import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './connection/connection.service';
import { WinstonCreate, WinstonTransports } from './utils/Logger';
import { DiscoverModule } from './discover/discover.module';
import { UploadModule } from './uploadFile/upload.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.env'
      // envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
      // ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    WinstonModule.forRoot({
      transports: [
        WinstonTransports(),
      ],
    }),
    MorganModule,
    DiscoverModule,
    UploadModule,
    AccountModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    //use morgan
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor("combined"),
    },
    AppService,
    ConnectionService
  ],
})
export class AppModule {}
