import { IsNotEmpty, IsString } from 'class-validator';

export class authDTO {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
