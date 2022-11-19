import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/app/entities/user/user.entity';
import { UserDto } from 'src/app/entities/user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public getAll() {
    return this.userRepository.find();
  }

  public getById(id: number) {
    return this.userRepository.findOne({
      where: { id }, //??ovako treba?
    });
  }

  public async create(userDto: UserDto) {
    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  public async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  public async update(id: number, dto: UserDto) {
    return await this.userRepository.update(id, dto);
  }
}
