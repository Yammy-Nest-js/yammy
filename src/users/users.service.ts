import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserParams } from 'src/utils/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUsers() {
    return this.usersRepository.find();
  }

  async signup(userDetails: CreateUserParams): Promise<any> {
    // * 비밀번호 암호화
    const hash = async (plainText: string): Promise<string> => {
      const saltOrRounds = 10;
      return await bcrypt.hash(plainText, saltOrRounds);
    };

    const hashedPw = await hash(userDetails.password);

    const hashedPwSignupInfo = {
      ...userDetails,
      password: hashedPw,
    };

    return await this.usersRepository.create(hashedPwSignupInfo);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.delete(id);
  }
}
