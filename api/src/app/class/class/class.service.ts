import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/app/entities/class/class.entity';
import { ClassDto } from 'src/app/entities/class/dto/class.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}

  public getAll() {
    return this.classRepository.find();
  }

  public getById(id: number) {
    return this.classRepository.findOne({
      where: { id }, //??ovako treba?
    });
  }

  public async create(classDto: ClassDto) {
    const clas = this.classRepository.create(classDto);
    return await this.classRepository.save(clas);
  }

  public async delete(id: number) {
    return await this.classRepository.delete(id);
  }

  public async update(id: number, dto: ClassDto) {
    return await this.classRepository.update(id, dto);
  }
}
