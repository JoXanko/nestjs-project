import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDto } from 'src/app/entities/location/dto/location.dto';
import { Repository } from 'typeorm';
import { Location } from 'src/app/entities/location/location.entity';
import { Message } from 'src/app/entities/message/message.entity';
import { MessageDto } from 'src/app/entities/message/dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  public getAll() {
    return this.messageRepository.find();
  }

  public getById(id: number) {
    return this.messageRepository.findOne({
      where: { id }, //??ovako treba?
    });
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
