/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GradeDto } from 'src/app/entities/grade/dto/grade.dto';
import { Grade } from 'src/app/entities/grade/grade.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade) private gradeRepository: Repository<Grade>,
  ) {}

  public getAll() {
    return this.gradeRepository.find();
  }

  public getById(id: number) {
    return this.gradeRepository.findOne({
      where: { id }, //??ovako treba?
    });
  }

  public async create(gradeDto: GradeDto) {
    const grade = this.gradeRepository.create(gradeDto);
    return await this.gradeRepository.save(grade);
  }

  public async delete(id: number) {
    return await this.gradeRepository.delete(id);
  }

  public async update(id: number, dto: GradeDto) {
    return await this.gradeRepository.update(id, dto);
  }
}
