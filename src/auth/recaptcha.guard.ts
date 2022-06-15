import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import axios from "axios";

  @Injectable()
  export class RecaptchaGuard implements CanActivate {
    constructor() {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const { body } = context.switchToHttp().getRequest();

      const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?response=${body.recaptchaValue}&secret=${process.env.GOOGLE_RECAPTCHA_SECRET}`);
      console.log(response.data)

      if (!response.data.success) {
        throw new ForbiddenException();
      }

      return true;
    }
  }