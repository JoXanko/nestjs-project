import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from 'src/app/entities/level/level.entity';
import { LevelDto } from 'src/app/entities/level/dto/level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level) private levelRepository: Repository<Level>,
  ) {}

  public getAll() {
    return this.levelRepository.find();
  }

  public getById(id: number) {
    return this.levelRepository.findOne({
      where: { id }, //??ovako treba?
    });
  }

  public async create(levelDto: LevelDto) {
    const level = this.levelRepository.create(levelDto);
    return await this.levelRepository.save(level);
  }

  public async delete(id: number) {
    return await this.levelRepository.delete(id);
  }

  public async update(id: number, dto: LevelDto) {
    return await this.levelRepository.update(id, dto);
  }
}
