import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/app/entities/caregory/category.entity';
import { CategoryDto } from 'src/app/entities/caregory/dto/category.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  public getAll() {
    return this.categoryRepository.find();
  }

  public getById(id: number) {
    return this.categoryRepository.findOne({
      where: { id }, //??ovako treba?
    });
  }

  public async create(categoryDto: CategoryDto) {
    const category = this.categoryRepository.create(categoryDto);
    return await this.categoryRepository.save(category);
  }

  /*public async delete(id: number) {
    return await this.categoryRepository.delete(id);
  }

  public async update(id: number, dto: CategoryDto) {
      return await this.categoryRepository.update(id, dto);
}*/
}
