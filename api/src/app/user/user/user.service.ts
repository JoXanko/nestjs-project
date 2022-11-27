import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/app/entities/user/user.entity';
import { UserDto } from 'src/app/entities/user/dto/user.dto';
import { CreateUserDto } from 'src/app/entities/user/dto/create-user.dto';
import { hashPassword } from 'src/app/bcrypt/bcrypt';
import { UpdateUserDto } from 'src/app/entities/user/dto/update-user.dto';
import { Type } from 'src/app/entities/user/type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });

    if (userAlreadyExists) {
      throw new ConflictException();
    }

    const password = await hashPassword(createUserDto.password);
    const user = this.userRepository.create({ ...createUserDto, password });
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findAllStudents() {
    return await this.userRepository.find({ where: { role: Type.Student } });
  }

  async findAllTutors() {
    return await this.userRepository.find({ where: { role: Type.Tutor } });
  }

  async findUsersByRole() {
    const usersByRole = { tutors: 0, students: 0 };
    const users = await this.userRepository.find();
    users.forEach((user) => {
      if (user.role == 'student') usersByRole.students++;
      if (user.role == 'tutor') usersByRole.tutors++;
    });
    return usersByRole;
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async getAbout(id: number) {
    /*const user = await this.userRepository.findOne({
      where: { id },
    });

    return user;*/
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
