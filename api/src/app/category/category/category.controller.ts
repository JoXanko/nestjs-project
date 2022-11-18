/* eslint-disable prettier/prettier */
import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GradeDto } from 'src/app/entities/grade/dto/grade.dto';
import { CategoryDto } from 'src/app/entities/caregory/dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  public getCategories() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  public getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getById(id);
  }

  @Post()
  public addCategory(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  /*@Delete(":id")//ZA ADMINA????
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.categoryService.delete(id);
    }*/
}
