import { ChatService } from './chat.service';
import {
  Body,
  Put,
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
  @Get('getChatForUser/:idUser')
  public getChatsForUser(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.chatService.getAll(idUser);
  }

  @Get('getChat/:idTutor/:idStudent')
  public getChats(
    @Param('idTutor', ParseIntPipe) idTutor: number,
    @Param('idStudent', ParseIntPipe) idStudent: number,
  ) {
    return this.chatService.getById(idTutor, idStudent);
  }

  @Post()
  public addChat(@Body() dto: ChatDto) {
    return this.chatService.create(dto);
  }

  @Put('updateSeen/:idChat')
  public updateSeen(@Param('idChat', ParseIntPipe) idChat: number) {
    return this.chatService.updateSeen(idChat);
  }

  /*@Delete(":id")//ZA ADMINA????
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.gradeService.delete(id);
    }*/
}
