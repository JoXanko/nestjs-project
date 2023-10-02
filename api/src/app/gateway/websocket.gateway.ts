import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/app/entities/message/message.entity';
import { MessageDto } from 'src/app/entities/message/dto/message.dto';
import { Chat } from 'src/app/entities/chat/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'], // List of allowed origins
        methods: ['GET', 'POST'],
    },
})
export class WebsocketGateway {
    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    ) { }
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        // console.log(data)
        const socketsInRoom = this.server.sockets.adapter.rooms.get(data.room);
        const numUsers = socketsInRoom ? socketsInRoom.size : 0;

        client.join(data.room);
        this.server.to(data.room).emit('joinedRoom', {data,numUsers});
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        console.log(data.room)
        client.leave(data.room);
        this.server.to(data.room).emit('leftRoom', data);
    }

    @SubscribeMessage('chatMessage')
    async handleChatMessage(@MessageBody() messageDto: any, @ConnectedSocket() client: Socket) {
        const newMessage = new Message();
        const chat = await this.chatRepository.findOne({
            where: { id: messageDto.chatId },
        });

        chat.seen = true;
        await this.chatRepository.save(chat);
        newMessage.date = messageDto.date;
        newMessage.text = messageDto.text;
        newMessage.senderId = messageDto.senderId;
        newMessage.chat = chat;

        await this.messageRepository.save(newMessage);

        var mess: MessageDto = { chatId: messageDto.chatId, date: messageDto.date, seen: messageDto.seen, senderId: messageDto.senderId, text: messageDto.text };

        const room = messageDto.room;
        await this.server.to(room).emit('newMessage', mess);
        console.log(messageDto)
    }
}