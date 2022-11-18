/* eslint-disable prettier/prettier */
import { ClassService } from './class.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClassDto } from 'src/app/entities/class/dto/class.dto';

@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}
  @Get()
  public getClasses() {
    return this.classService.getAll();
  }

  @Get(':id')
  public getClass(@Param('id', ParseIntPipe) id: number) {
    return this.classService.getById(id);
  }

  @Post()
  public addClass(@Body() dto: ClassDto) {
    return this.classService.create(dto);
  }

  /*@Delete(":id")//ZA ADMINA????
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.classService.delete(id);
    }*/
}
