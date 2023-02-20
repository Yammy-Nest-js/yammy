import { IsNotEmpty, IsString } from 'class-validator';

export class userUpdateDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
