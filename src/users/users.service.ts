import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUsers() {
    return this.userRepository.find();
  }
  async getByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      '사용자 이메일이 존재하지 않습니다.',
      HttpStatus.NOT_FOUND,
    );
  }
  async create(userDetails: CreateUserParams): Promise<any> {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
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

    return await this.userRepository.create(hashedPwSignupInfo);
  }

  async updateOne(id: number, payload: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...payload });
  }

  async deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      '사용자가 존재하지 않습니다.',
      HttpStatus.NOT_FOUND,
    );
  }
}
