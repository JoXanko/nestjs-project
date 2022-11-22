import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../entities/chat/chat.entity';
import { ChatDto } from '../entities/chat/dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  public getAll() {
    return this.chatRepository.find();
  }

  public async getById(idTutor: number, idStudent: number) {
    const chats = await this.chatRepository.findOne({
      relations: { student: true, tutor: true },
      where: { student: { id: idStudent }, tutor: { id: idTutor } },
    });
    if (chats != null) return chats;
    else return false;
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
