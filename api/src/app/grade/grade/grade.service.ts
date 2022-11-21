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

  /*public getAll() {
    return this.gradeRepository.find();
  }*/

  public getById(classId: number) {
    //za tutora pregled ocena
    return this.gradeRepository.find({
      relations: { class: true },
      where: {
        class: {
          id: classId,
        },
      },
    });
  }

  public async create(gradeDto: GradeDto) {
    console.log(gradeDto)
    const grade = this.gradeRepository.create(gradeDto);
    return await this.gradeRepository.save(grade);
  }

  public async delete(id: number) {
    return await this.gradeRepository.delete(id);
  }

  public async updateFlagged(GradeId: number) {
    const gradeToUpdate = await this.gradeRepository.findOneBy({
      id: GradeId,
    });
    gradeToUpdate.flagged = !gradeToUpdate.flagged;
    return await this.gradeRepository.save(gradeToUpdate);
  }

  public async updateNew(classId: number) {
    //svaki grade za dati class new na false
    const gradeToUpdate = await this.gradeRepository.find({
      relations: { class: true },
      where: {
        class: {
          id: classId,
        },
      },
    });
    gradeToUpdate.forEach((grade) => {
      grade.new = false;
    });
    return await this.gradeRepository.save(gradeToUpdate);
  }
}
