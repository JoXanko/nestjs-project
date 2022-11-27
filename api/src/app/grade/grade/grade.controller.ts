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

  @Get('/signleGrade/:id')
  public getGrade(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.getById(id);
  }

  @Get('averageGrade/:id')
  public getAverage(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.getAverageGrade(id);
  }

  @Get('getFlagged')
  public getFlagged() {
    return this.gradeService.getFlaggedGrades();
  }

  @Get('userGrade/:idClass/:idUser')
  public getDidUserGraded(@Param('idClass', ParseIntPipe) idClass: number,@Param('idUser', ParseIntPipe) idUser: number) {
    return this.gradeService.didUserGraded(idClass,idUser);
  }

  @Post('addGrade')
  public addGrade(@Body() dto: GradeDto) {
    return this.gradeService.create(dto);
  }

  @Put('updateFlagged/:id')
  public updateFlagged(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.updateFlagged(id);
  }

  @Put('updateFlaggedOK/:id')
  public updateFlaggedOk(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.updateFlaggedOK(id);
  }

  @Put('updateNew/:id')
  public updateNew(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.updateNew(id);
  }

  @Delete('deleteGrade/:id') 
  public deleteGrade(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.delete(id);
  }
}
