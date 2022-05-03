import { Module } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';
import { DiscoverController } from './discover.controller';
import { DiscoverService } from './discover.service';

@Module({
  imports: [],
  controllers: [
    DiscoverController,
  ],
  providers: [
    DiscoverService,
    ConnectionService,
  ],
  exports: []
})
export class DiscoverModule {}
