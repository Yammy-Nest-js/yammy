import { IsNotEmpty, IsString } from 'class-validator';

export class userCreateDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
