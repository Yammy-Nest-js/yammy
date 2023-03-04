import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUsers() {
    return this.usersRepository.find();
  }

  async signup(userDetails: CreateUserParams): Promise<any> {
    return await this.usersRepository.create(userDetails);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.delete(id);
  }
}
