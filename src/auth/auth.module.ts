import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AccountService } from 'src/account/account.service';
import { ConnectionService } from 'src/connection/connection.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { LocalAdminStrategy } from './local.strategy-admin';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET_KEY'),
                signOptions: {expiresIn: '86400s'}
            })
        }),
        PassportModule,
        // AccountModule
    ],
    controllers: [],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
        LocalAdminStrategy,
        ConnectionService,
        AccountService
    ],
    exports: [
        AuthService,
    ]
})
export class AuthModule {}
