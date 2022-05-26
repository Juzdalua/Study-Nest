import { Module } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';

@Module({
  controllers: [DiscordController],
  providers: [
    DiscordService,
    ConnectionService,
  ]
})
export class DiscordModule {}
