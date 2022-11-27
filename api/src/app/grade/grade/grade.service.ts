/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GradeDto } from 'src/app/entities/grade/dto/grade.dto';
import { Grade } from 'src/app/entities/grade/grade.entity';
import { Class } from 'src/app/entities/class/class.entity';
import { User } from 'src/app/entities/user/user.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade) private gradeRepository: Repository<Grade>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /*public getAll() {
    return this.gradeRepository.find();
  }*/
  public async getAverageGrade(classId: number) {
    //za tutora average ocena
    const gradesArray = await this.gradeRepository.find({
      relations: { class: true },
      where: {
        class: {
          id: classId,
        },
      },
    });
    let sum = 0;
    let count = 0;
    gradesArray.forEach((singleGrade) => {
      sum += singleGrade.grade;
      count++;
    });
    if (count == 0) return 0;
    return Number(sum / count);
  }

  public async getFlaggedGrades() {
    return this.gradeRepository.find({
      relations: { student: true, class: true },
      where: { flagged: true },
    });
  }
  public async didUserGraded(classId: number, userId: number) {
    const grade = await this.gradeRepository.findOne({
      relations: { class: true, student: true },
      where: {
        student: {
          id: userId,
        },
        class: {
          id: classId,
        },
      },
    });
    if (grade != null) return grade;
    else return false;
  }

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
    const newGrade = new Grade();
    const student = await this.userRepository.findOne({
      where: { id: gradeDto.studentId },
    });

    const cls = await this.classRepository.findOne({
      where: { id: gradeDto.classId },
    });

    newGrade.class = cls;
    newGrade.student = student;
    newGrade.comment = gradeDto.comment;
    newGrade.date = gradeDto.date;
    //newGrade.flagged=false;
    //newGrade.new=true;
    newGrade.grade = gradeDto.grade;

    //const grade = this.gradeRepository.create(gradeDto);
    return await this.gradeRepository.save(newGrade);
  }

  public async delete(id: number) {
    return await this.gradeRepository.delete(id);
  }

  public async updateFlagged(GradeId: number) {
    const gradeToUpdate = await this.gradeRepository.findOneBy({
      id: GradeId,
    });
    gradeToUpdate.flagged = true;
    return await this.gradeRepository.save(gradeToUpdate);
  }

  public async updateFlaggedOK(GradeId: number) {
    const gradeToUpdate = await this.gradeRepository.findOneBy({
      id: GradeId,
    });
    gradeToUpdate.flagged = false;
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
