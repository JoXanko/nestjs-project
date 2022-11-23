import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDto } from 'src/app/entities/location/dto/location.dto';
import { Repository } from 'typeorm';
import { Location } from 'src/app/entities/location/location.entity';
import { Message } from 'src/app/entities/message/message.entity';
import { MessageDto } from 'src/app/entities/message/dto/message.dto';
import { Chat } from 'src/app/entities/chat/chat.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  public getAll() {
    return this.messageRepository.find();
  }

  public getById(idChat: number) {
    return this.messageRepository.find({
      relations: { chat: true },
      where: { chat: { id: idChat } }, //??ovako treba?
    });
  }
  public async postMessage(messageDto: MessageDto) {
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

    return await this.messageRepository.save(newMessage);
  }

  public async create(messageDto: MessageDto) {
    const message = this.messageRepository.create(messageDto);
    return await this.messageRepository.save(message);
  }

  public async delete(id: number) {
    return await this.messageRepository.delete(id);
  }

  public async update(id: number, dto: MessageDto) {
    return await this.messageRepository.update(id, dto);
  }
}
