import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private userReporitory: Repository<User>,
  ) {}

  async find() {
    return this.userReporitory.find();
  }

  async create(userDetails: CreateUserParams): Promise<any> {
    const newUser = this.userReporitory.create({
      ...userDetails,
      createdAt: new Date(),
    });

    await this.userReporitory.save(newUser);
  }

  async delete(id: string) {
    return await this.userReporitory.delete({ id });
  }
}
