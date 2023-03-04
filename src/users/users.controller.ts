import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userSignupDto } from './dto/users.signup.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findUsers();
  }

  @Get(':id')
  async findOneUser() {
    return 'find one user';
  }
  // * 회원가입
  @Post()
  async signup(@Body() userSignupDto: userSignupDto) {
    return await this.usersService.create(userSignupDto);
  }

  // * 회원탈퇴
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
