import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionGuard } from 'src/app/auth/guards/session.guard';
import { MessageDto } from 'src/app/entities/message/dto/message.dto';
import { MessageService } from './message.service';
@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Get()
  public getMessages() {
    return this.messageService.getAll();
  }

  @Get('getChatMessages/:idChat')
  @UseGuards(SessionGuard)
  public getMessage(@Param('idChat', ParseIntPipe) idChat: number) {
    return this.messageService.getById(idChat);
  }

  @Post('messageSend')
  @UseGuards(SessionGuard)
  public postMessage(@Body() dto: MessageDto) {
    return this.messageService.postMessage(dto);
  }

  @Post()
  @UseGuards(SessionGuard)
  public addMessage(@Body() dto: MessageDto) {
    return this.messageService.create(dto);
  }

  /*@Delete(":id")//ZA ADMINA????
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.locationService.delete(id);
    }*/
}
