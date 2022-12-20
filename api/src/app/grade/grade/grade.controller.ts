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
  UseGuards,
} from '@nestjs/common';
import { GradeDto } from 'src/app/entities/grade/dto/grade.dto';
import { ApiTags } from '@nestjs/swagger';
import { SessionGuard } from 'src/app/auth/guards/session.guard';

@ApiTags('Grade')
@Controller('grade')
export class GradeController {
  constructor(private gradeService: GradeService) {}
  /*@Get()
  public getGrades() {
    return this.gradeService.getAll();
  }*/

  @Get('/signleGrade/:id')
  @UseGuards(SessionGuard)
  public getGrade(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.getById(id);
  }

  @Get('averageGrade/:id')
  @UseGuards(SessionGuard)
  public getAverage(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.getAverageGrade(id);
  }

  @Get('getFlagged')
  @UseGuards(SessionGuard)
  public getFlagged() {
    return this.gradeService.getFlaggedGrades();
  }

  @Get('userGrade/:idClass/:idUser')
  @UseGuards(SessionGuard)
  public getDidUserGraded(@Param('idClass', ParseIntPipe) idClass: number,@Param('idUser', ParseIntPipe) idUser: number) {
    return this.gradeService.didUserGraded(idClass,idUser);
  }

  @Post('addGrade')
  @UseGuards(SessionGuard)
  public addGrade(@Body() dto: GradeDto) {
    return this.gradeService.create(dto);
  }

  @Put('updateFlagged/:id')
  @UseGuards(SessionGuard)
  public updateFlagged(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.updateFlagged(id);
  }

  @Put('updateFlaggedOK/:id')
  @UseGuards(SessionGuard)
  public updateFlaggedOk(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.updateFlaggedOK(id);
  }

  @Put('updateNew/:id')
  @UseGuards(SessionGuard)
  public updateNew(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.updateNew(id);
  }

  @Delete('deleteGrade/:id') 
  @UseGuards(SessionGuard)
  public deleteGrade(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.delete(id);
  }
}
