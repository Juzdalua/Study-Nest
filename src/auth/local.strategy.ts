import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
    ) {
    super({
        // usernameField: 'id',
        passwordField: 'role',
    });
  }

  async validate(username: string, role:string): Promise<any> {

    const user = await this.authService.validateUser(username);

    if(user && user.ROLE === role)
      return user;
    else
      throw new UnauthorizedException();
  }
}