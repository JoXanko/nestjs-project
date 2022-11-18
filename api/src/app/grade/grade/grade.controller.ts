/* eslint-disable prettier/prettier */
import { GradeService } from './grade.service';
import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
  } from "@nestjs/common";
  import { GradeDto } from 'src/app/entities/grade/dto/grade.dto';

@Controller('grade')
export class GradeController {
    constructor(private gradeService: GradeService) {}
    @Get()
    public getGrades() {
      return this.gradeService.getAll();
    }
  
    @Get(":id")
    public getGrade(@Param("id", ParseIntPipe) id: number) {
      return this.gradeService.getById(id);
    }
  
    @Post()
    public addGrade(@Body() dto: GradeDto) {
      return this.gradeService.create(dto);
    }
  
    /*@Delete(":id")//ZA ADMINA????
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.gradeService.delete(id);
    }*/
}
