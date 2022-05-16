import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  async validateUser(username:string){
    const user = await this.accountService.findOneAdmin(username);

      if(user){
        const {username, ...result} = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userId: user.id, sub: user.ROLE };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async decode(access_token:string){
      const userInfo = this.jwtService.decode(access_token);
      return userInfo;
  }
}