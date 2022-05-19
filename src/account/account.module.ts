import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { ConnectionService } from 'src/connection/connection.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [
    AccountController,
  ],
  providers: [
    AccountService,
    ConnectionService,
  ],
  exports: [
    AccountService
  ]
})
export class AccountModule {}
