/* eslint-disable prettier/prettier */
import { LocationService } from './location.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LocationDto } from 'src/app/entities/location/dto/location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}
  @Get()
  public getLocations() {
    return this.locationService.getAll();
  }

  @Get(':id')
  public getLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.getById(id);
  }

  @Post()
  public addLocation(@Body() dto: LocationDto) {
    return this.locationService.create(dto);
  }

  /*@Delete(":id")//ZA ADMINA????
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.locationService.delete(id);
    }*/
}
