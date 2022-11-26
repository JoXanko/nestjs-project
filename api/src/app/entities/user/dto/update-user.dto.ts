import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

/*import { PartialType } from '@nestjs/mapped-types';
import { Type } from '../type';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  name: string;
  surname: string;
  imageUrl: string;
  bio: string;
  role: Type;
}
*/
