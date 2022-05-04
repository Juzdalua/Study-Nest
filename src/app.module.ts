import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './connection/connection.service';
import { WinstonTransports } from './utils/Logger';
import { DiscoverModule } from './discover/discover.module';
import { UploadModule } from './uploadFile/upload.module';

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
    DiscoverModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConnectionService
  ],
})
export class AppModule {}
