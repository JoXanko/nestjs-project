import { User } from '../../user/user.entity';

export class ChatDto {
  message: string;
  date: string;
  student: User;
  tutor: User;
}
