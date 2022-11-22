import { Message } from '../../message/message.entity';
import { User } from '../../user/user.entity';

export class ChatDto {
  studentId: number;
  tutorId: number;
  messages: Message[];
}
