/* eslint-disable prettier/prettier */
import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
} from '@nestjs/common';
import { GradeDto } from 'src/app/entities/grade/dto/grade.dto';
import { CategoryDto } from 'src/app/entities/caregory/dto/category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get(':id')
  public getCategories(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getById(id);
  }

  @Get()
  public getCategory() {
    return this.categoryService.getAll();
  }

  @Post()
  public addCategory(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  @Delete(':name/:levelName')
  public deleteG(
    @Param('name') name: string,
    @Param('levelName', ParseIntPipe) levelName: number,
  ) {
    return this.categoryService.delete(name, levelName);
  }
}
