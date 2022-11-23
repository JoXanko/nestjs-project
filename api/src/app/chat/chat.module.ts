import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../entities/chat/chat.entity';
import { Message } from '../entities/message/message.entity';
import { User } from '../entities/user/user.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User,Message])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
