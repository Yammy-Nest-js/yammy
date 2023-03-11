import { UsersService } from './../users/users.service';
import { User } from './../users/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.userservice.getByEmail(email);
      await this.verifyPassword(password, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        '인증을 허가하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async verifyPassword(password: string, hashedPw: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPw);
    if (!isPasswordMatching) {
      throw new HttpException(
        '인증을 허가하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/ Max-Age=0`;
  }
}
