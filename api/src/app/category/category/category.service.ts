import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/app/entities/caregory/category.entity';
import { CategoryDto } from 'src/app/entities/caregory/dto/category.dto';
import { Level } from 'src/app/entities/level/level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) {}

  public getAll(idLevel: number) {
    return this.categoryRepository.find({
      relations: { level: true },
      where: {
        level: {
          id: idLevel,
        },
      },
    });
  }

  /*public getById(id: number) {
    return this.categoryRepository.findOne({
      where: { id }, //??ovako treba?
    });
  }*/

  public async create(categoryDto: CategoryDto) {
    /*const category = this.categoryRepository.create(categoryDto);
    return await this.categoryRepository.save(category);*/

    /*const categoryAlreadyExists = await this.categoryRepository.findOneBy({
      name: categoryDto.name,
    });

    if (categoryAlreadyExists) {
      throw new ConflictException();
    }*/

    const level = await this.levelRepository.findOneBy({
      id: categoryDto.levelId,
    });

    const category = this.categoryRepository.create(categoryDto);
    category.level = level;

    return await this.categoryRepository.save(category);
  }

  /*public async delete(id: number) {
    return await this.categoryRepository.delete(id);
  }

  public async update(id: number, dto: CategoryDto) {
      return await this.categoryRepository.update(id, dto);
}*/
}
