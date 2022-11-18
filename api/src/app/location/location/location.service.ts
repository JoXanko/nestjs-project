/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationDto } from 'src/app/entities/location/dto/location.dto';
import { Repository } from 'typeorm';
import { Location } from 'src/app/entities/location/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private locationRepository: Repository<Location>,
  ) {}

  public getAll() {
    return this.locationRepository.find();
  }

  public getById(id: number) {
    return this.locationRepository.findOne({
      where: { id }, //??ovako treba?
    });
  }

  public async create(locationDto: LocationDto) {
    const location = this.locationRepository.create(locationDto);
    return await this.locationRepository.save(location);
  }

  public async delete(id: number) {
    return await this.locationRepository.delete(id);
  }

  public async update(id: number, dto: LocationDto) {
    return await this.locationRepository.update(id, dto);
  }
}
