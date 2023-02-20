import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { userCreateDto } from './dto/users.create.dto';
import { userUpdateDto } from './dto/users.update';
import { UsersService } from './users.service';

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

  @Post()
  async signup(@Body() userCreateDto: userCreateDto) {
    console.log('🐶body', userCreateDto);
    return await this.usersService.create(userCreateDto);
  }

  @Patch(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdateDto: userUpdateDto,
  ) {
    return this.usersService.updateOne(id, userUpdateDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
