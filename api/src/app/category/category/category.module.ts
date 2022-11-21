import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/app/entities/caregory/category.entity';
import { Level } from 'src/app/entities/level/level.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Level])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
