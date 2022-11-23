import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../entities/chat/chat.entity';
import { ChatDto } from '../entities/chat/dto/chat.dto';
import { Message } from '../entities/message/message.entity';
import { User } from '../entities/user/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  public async getAll(idUser: number) {
    const ifStudent = await this.chatRepository.find({
      relations: { student: true, tutor: true },
      where: { student: { id: idUser } },
    });
    let newMessages = false;
    ifStudent.forEach(async (chat) => {
      const messages = await this.messageRepository.find({
        relations: { chat: true },
        where: { chat: { id: chat.id } },
      });
      messages.forEach((message) => {
        if (message.seen == false) newMessages = true;
      });
      if (newMessages == true) chat.seen == true;
      newMessages = false;
    });

    if (ifStudent.length == 0) {
      const chats = await this.chatRepository.find({
        relations: { student: true, tutor: true },
        where: { tutor: { id: idUser } },
      });
      let newMessages = false;
      chats.forEach(async (chat) => {
        const messages = await this.messageRepository.find({
          relations: { chat: true },
          where: { chat: { id: chat.id } },
        });
        messages.forEach((message) => {
          if (message.seen == false) newMessages = true;
        });
        if (newMessages == true) chat.seen == true;
        newMessages = false;
      });
      return chats;
    } else return ifStudent;
  }

  public async getById(idTutor: number, idStudent: number) {
    const chat = await this.chatRepository.findOne({
      relations: { tutor: true },
      where: { student: { id: idStudent }, tutor: { id: idTutor } },
    });
    if (chat != null) return chat;
    else {
      const newChat = new Chat();
      const tutor = await this.userRepository.findOne({
        where: { id: idTutor },
      });

      const student = await this.userRepository.findOne({
        where: { id: idStudent },
      });

      newChat.student = student;
      newChat.tutor = tutor;
      return await this.chatRepository.save(newChat);
    }
  }

  public async create(chatDto: ChatDto) {
    const chat = this.chatRepository.create(chatDto);
    return await this.chatRepository.save(chat);
  }

  public async delete(id: number) {
    return await this.chatRepository.delete(id);
  }

  public async update(id: number, dto: ChatDto) {
    return await this.chatRepository.update(id, dto);
  }
}
