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

  public async getAll() {
    class data {
      name: string;
      level: string[];
      constructor(name: string, level: string[]) {
        this.name = name;
        this.level = level;
      }
    }
    const dataToReturn: data[] = [];

    const categories = await this.categoryRepository.find({
      relations: { level: true },
    });
    categories.forEach((category) => {
      if (category.name != '*') {
        const name: string = category.name;
        const level: string[] = [];
        categories.forEach((innerCategory) => {
          if (innerCategory.name == name) level.push(innerCategory.level.name);
        });
        categories.forEach((innerCategory) => {
          if (innerCategory.name == name) innerCategory.name = '*';
        });
        const pushData: data = new data(name, level);
        dataToReturn.push(pushData);
      }
    });

    return dataToReturn;
  }
  public getById(idLevel: number) {
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

    const cat = await this.categoryRepository.findOne({
      relations: { level: true },
      where: {
        name: categoryDto.name,
        level: { id: categoryDto.levelId },
      },
    });
    if (cat == null) {
      const level = await this.levelRepository.findOneBy({
        id: categoryDto.levelId,
      });

      console.log(categoryDto);
      const category = this.categoryRepository.create(categoryDto);
      category.level = level;

      //console.log(category);
      return await this.categoryRepository.save(category);
    } else return 'category already exist';
  }

  public async delete(name: string, levelId: number) {
    const category = await this.categoryRepository.findOne({
      relations: { level: true },
      where: { name: name, level: { id: levelId } },
    });
    return await this.categoryRepository.delete(category.id);
  }

  /*public async update(id: number, dto: CategoryDto) {
      return await this.categoryRepository.update(id, dto);
}*/
}
