import { Chat } from '../../chat/chat.entity';
import { Class } from '../../class/class.entity';
import { Grade } from '../../grade/grade.entity';
import { Type } from '../type';

export class UserDto {
  username: string;
  password: string;
  name: string;
  surname: string;
  imageUrl: string;
  bio: string;
  role: Type;
  classes: Class[];
  grades: Grade[];
  chatsStudent: Chat[];
  chatsTutor: Chat[];
}
