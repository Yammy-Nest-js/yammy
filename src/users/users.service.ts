import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userReporitory: Repository<User>,
  ) {}

  async findUsers() {
    return this.userReporitory.find();
  }

  async create(userDetails: CreateUserParams): Promise<any> {
    const newUser = this.userReporitory.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return this.userReporitory.save(newUser);
  }

  async deleteUser(id: string) {
    return this.userReporitory.delete({ id });
  }
}
