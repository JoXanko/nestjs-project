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
  UseGuards,
} from '@nestjs/common';
import { GradeDto } from 'src/app/entities/grade/dto/grade.dto';
import { CategoryDto } from 'src/app/entities/caregory/dto/category.dto';
import { ApiTags } from '@nestjs/swagger';
import { SessionGuard } from 'src/app/auth/guards/session.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get(':id')
  @UseGuards(SessionGuard)
  public getCategories(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getById(id);
  }

  @Get()
  @UseGuards(SessionGuard)
  public getCategory() {
    return this.categoryService.getAll();
  }

  @Post()
  @UseGuards(SessionGuard)
  public addCategory(@Body() dto: CategoryDto) {
    return this.categoryService.create(dto);
  }

  @Delete(':name/:levelName')
  @UseGuards(SessionGuard)
  public deleteG(
    @Param('name') name: string,
    @Param('levelName', ParseIntPipe) levelName: number,
  ) {
    return this.categoryService.delete(name, levelName);
  }
}
