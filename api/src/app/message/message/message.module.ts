import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/app/entities/chat/chat.entity';
import { Message } from 'src/app/entities/message/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
