/* eslint-disable prettier/prettier */
import { ClassService } from './class.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
} from '@nestjs/common';
import { ClassDto } from 'src/app/entities/class/dto/class.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Class')
@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}
  @Get('singleClass/:id')
  public getSingleClass(@Param('id', ParseIntPipe) id: number) {
    return this.classService.getSingle(id);
  }

  @Get('classes/:id')
  public getClass(@Param('id', ParseIntPipe) id: number) {
    return this.classService.getById(id);
  }

  @Post('addClass')
  public addClass(@Body() dto: ClassDto) {
    return this.classService.create(dto);
  }

  @Delete('deleteClass/:id') //ZA ADMINA????
  public deleteG(@Param('id', ParseIntPipe) id: number) {
    return this.classService.delete(id);
  }
}
