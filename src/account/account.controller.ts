import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ConnectionService } from 'src/connection/connection.service';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('account')
export class AccountController {
    constructor(
        private connectionService: ConnectionService,
        private authService: AuthService,
        ){}

    @Post("/admin")
    @UseGuards(AuthGuard('admin'))
    async getAdminPage(@Request() req:Express.Request){

        return this.authService.login(req.user)
    }

    @Post("/user")
    @UseGuards(LocalAuthGuard)
    async getUserPage(@Request() req:Express.Request){

        return this.authService.login(req.user)
    }

    @Get("profile")
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getProfile(@Request() req:Express.Request){
        // console.log(req)
        return req.user;
    }


}
