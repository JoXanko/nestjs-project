import { ChatService } from './chat.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ChatDto } from '../entities/chat/dto/chat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get()
  public getChats() {
    return this.chatService.getAll();
  }

  @Get(':id')
  public getChat(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.getById(id);
  }

  @Post()
  public addChat(@Body() dto: ChatDto) {
    return this.chatService.create(dto);
  }

  /*@Delete(":id")//ZA ADMINA????
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.gradeService.delete(id);
    }*/
}
