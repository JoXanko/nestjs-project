import { IsNotEmpty, MinLength } from 'class-validator';
import { Type } from '../type';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  /* @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  role: Type;*/
}
