import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/app/entities/caregory/category.entity';
import { Class } from 'src/app/entities/class/class.entity';
import { ClassDto } from 'src/app/entities/class/dto/class.dto';
import { Grade } from 'src/app/entities/grade/grade.entity';
import { Location } from 'src/app/entities/location/location.entity';
import { User } from 'src/app/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(User) private userRepository: Repository<User>,
    //@InjectRepository(Grade) private gradeRepository: Repository<Grade>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  public getSingle(idClass: number) {
    return this.classRepository.findOne({
      relations: { user: true, location: true, category: true, grades: true },
      where: {
        id: idClass,
      },
    });
  }

  public getAll() {
    return this.classRepository.find({
      relations: { category: true, location: true },
    });
  }

  public async getByIdUser(userId: number) {
    const classes = await this.classRepository.find({
      relations: { location: true, category: true, grades: true, user: true },
      where: { user: { id: userId } },
    });
    let sum = 0;
    let count = 0;
    classes.forEach((singleClass) => {
      singleClass.grades.forEach((grade) => {
        sum += grade.grade;
        count++;
        if (grade.new == true) singleClass.new = true;
      });
      singleClass.avgGrade = sum / count;
      singleClass.numberOfGrades = count;
      sum = 0;
      count = 0;
    });
    return classes;
  }

  public async getSearchClass(locationId: number, categoryId: number) {
    const classes = await this.classRepository.find({
      relations: { location: true, category: true, grades: true, user: true },
      where: { location: { id: locationId }, category: { id: categoryId } },
    });
    let sum = 0;
    let count = 0;
    classes.forEach((singleClass) => {
      singleClass.grades.forEach((grade) => {
        sum += grade.grade;
        count++;
        if (grade.new == true) singleClass.new = true;
      });
      singleClass.avgGrade = sum / count;
      singleClass.numberOfGrades = count;
      sum = 0;
      count = 0;
    });
    return classes;
  }

  public async getById(idTutor: number) {
    const classes = await this.classRepository.find({
      relations: {
        user: true,
        location: true,
        category: { level: true },
        grades: true,
      },
      where: {
        user: {
          id: idTutor,
        },
      }, //??ovako treba?
    });
    let sum = 0;
    let count = 0;
    classes.forEach((singleClass) => {
      singleClass.grades.forEach((grade) => {
        sum += grade.grade;
        count++;
        if (grade.new == true) singleClass.new = true;
      });
      singleClass.avgGrade = sum / count;
      singleClass.numberOfGrades = count;
      sum = 0;
      count = 0;
    });
    return classes;
  }

  /*public async create(classDto: ClassDto) {
    const clas = this.classRepository.create(classDto);
    return await this.classRepository.save(clas);
  }*/

  public async create(classDto: ClassDto) {
    const newClass = new Class();
    const tutor = await this.userRepository.findOne({
      where: { id: classDto.userId },
    });

    const location = await this.locationRepository.findOne({
      where: { id: classDto.locationId },
    });

    const category = await this.categoryRepository.findOne({
      where: { id: classDto.categoryId },
    });

    newClass.photo = classDto.photo;
    newClass.name = classDto.name;
    newClass.bio = classDto.bio;
    //newGrade.flagged=false;
    //newGrade.new=true;
    newClass.user = tutor;
    newClass.location = location;
    newClass.category = category;

    //const grade = this.gradeRepository.create(gradeDto);
    return await this.classRepository.save(newClass);
  }

  public async updateClass(classDto: ClassDto, classId: number) {
    const classToUpdate = await this.classRepository.findOneBy({
      id: classId,
    });
    classToUpdate.name = classDto.name;
    classToUpdate.bio = classDto.bio;
    classToUpdate.photo = classDto.photo;
    const tutor = await this.userRepository.findOne({
      where: { id: classDto.userId },
    });

    const location = await this.locationRepository.findOne({
      where: { id: classDto.locationId },
    });

    const category = await this.categoryRepository.findOne({
      where: { id: classDto.categoryId },
    });
    classToUpdate.user = tutor;
    classToUpdate.location = location;
    classToUpdate.category = category;
    return await this.classRepository.save(classToUpdate);
  }

  public async delete(id: number) {
    return await this.classRepository.delete(id);
  }

  public async update(id: number, dto: ClassDto) {
    return await this.classRepository.update(id, dto);
  }
}
