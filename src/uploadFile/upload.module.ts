import { Module } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [
    UploadService,
    ConnectionService
  ]
})
export class UploadModule {}
