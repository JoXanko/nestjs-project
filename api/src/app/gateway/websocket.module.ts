import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { Message } from '../entities/message/message.entity';
import { Chat } from '../entities/chat/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Message, Chat])],
    providers: [WebsocketGateway],
})
export class WebsocketModule { }