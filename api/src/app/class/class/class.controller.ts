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
  Put,
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
  public getClasses(@Param('id', ParseIntPipe) id: number) {
    return this.classService.getById(id);
  }

  @Get('classesByUser/:id')
  public getClassByUser(@Param('id', ParseIntPipe) id: number) {
    return this.classService.getByIdUser(id);
  }

  @Get('classesSearch/:locationId/:categoryId')
  public getClassSearch(
    @Param('locationId', ParseIntPipe) locationId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.classService.getSearchClass(locationId, categoryId);
  }

  @Post('addClass')
  public addClass(@Body() dto: ClassDto) {
    return this.classService.create(dto);
  }

  @Put('updateClass/:id')
  public updateClass(
    @Body() dto: ClassDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.classService.updateClass(dto, id);
  }

  @Delete('deleteClass/:id') //ZA ADMINA????
  public deleteG(@Param('id', ParseIntPipe) id: number) {
    return this.classService.delete(id);
  }
}
