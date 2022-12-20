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
  UseGuards,
} from '@nestjs/common';
import { ClassDto } from 'src/app/entities/class/dto/class.dto';
import { ApiTags } from '@nestjs/swagger';
import { SessionGuard } from 'src/app/auth/guards/session.guard';

@ApiTags('Class')
@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}
  @Get('singleClass/:id')
  @UseGuards(SessionGuard)
  public getSingleClass(@Param('id', ParseIntPipe) id: number) {
    return this.classService.getSingle(id);
  }

  @Get('classes/:id')
  @UseGuards(SessionGuard)
  public getClasses(@Param('id', ParseIntPipe) id: number) {
    return this.classService.getById(id);
  }

  @Get('classesByUser/:id')
  @UseGuards(SessionGuard)
  public getClassByUser(@Param('id', ParseIntPipe) id: number) {
    return this.classService.getByIdUser(id);
  }

  @Get('classesSearch/:locationId/:categoryId')
  @UseGuards(SessionGuard)
  public getClassSearch(
    @Param('locationId', ParseIntPipe) locationId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.classService.getSearchClass(locationId, categoryId);
  }

  @Get()
  @UseGuards(SessionGuard)
  public getAllClasses() {
    return this.classService.getAll();
  }

  @Post('addClass')
  @UseGuards(SessionGuard)
  public addClass(@Body() dto: ClassDto) {
    return this.classService.create(dto);
  }

  @Put('updateClass/:id')
  @UseGuards(SessionGuard)
  public updateClass(
    @Body() dto: ClassDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.classService.updateClass(dto, id);
  }

  @Delete('deleteClass/:id') //ZA ADMINA????
  @UseGuards(SessionGuard)
  public deleteG(@Param('id', ParseIntPipe) id: number) {
    return this.classService.delete(id);
  }
}
