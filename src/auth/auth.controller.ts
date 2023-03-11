import { authDTO } from './auth.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { Request, Response } from 'express';
import JwtAuthGuard from './jwt-auth.guard';
import { RequestWithUser } from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(
    @Req() req: Request,
    @Body() request: authDTO,
    @Res() response: Response,
  ) {
    const { user } = req;
    const cookie = this.authservice.getCookieWithJwtToken(user);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }
  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authservice.getCookieForLogOut());
    return response.sendStatus(200);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
