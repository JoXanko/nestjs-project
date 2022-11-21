/* eslint-disable prettier/prettier */
import { GradeService } from './grade.service';
import {
  Delete,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { GradeDto } from 'src/app/entities/grade/dto/grade.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Grade')
@Controller('grade')
export class GradeController {
  constructor(private gradeService: GradeService) {}
  /*@Get()
  public getGrades() {
    return this.gradeService.getAll();
  }*/

  @Get(':id')
  public getGrade(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.getById(id);
  }

  @Post()
  public addLocation(@Body() dto: GradeDto) {
    return this.gradeService.create(dto);
  }

  @Put('updateFlagged/:id')
  public updateFlagged(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.updateFlagged(id);
  }
  @Put('updateNew/:id')
  public updateNew(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.updateNew(id);
  }

  @Delete(':id') //ZA ADMINA????
  public deleteG(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.delete(id);
  }
}
