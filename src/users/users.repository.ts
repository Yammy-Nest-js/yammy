import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private userEntity: Repository<User>) {}

  async find() {
    return this.userEntity.find();
  }

  async create(userDetails: CreateUserParams): Promise<any> {
    const newUser = this.userEntity.create({
      ...userDetails,
      createdAt: new Date(),
    });

    await this.userEntity.save(newUser);
  }

  async delete(id: string) {
    return await this.userEntity.delete({ id });
  }
}
