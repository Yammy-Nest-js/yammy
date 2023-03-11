import { UsersService } from './../users/users.service';
import { User } from './../users/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userservice: UsersService) {}
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
}
