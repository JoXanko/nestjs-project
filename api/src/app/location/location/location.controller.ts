/* eslint-disable prettier/prettier */
import { LocationService } from './location.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LocationDto } from 'src/app/entities/location/dto/location.dto';
import { Location } from 'src/app/entities/location/location.entity';
import { ApiTags } from '@nestjs/swagger';
import { SessionGuard } from 'src/app/auth/guards/session.guard';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}
  @Get()
  @UseGuards(SessionGuard)
  public getLocations() {
    return this.locationService.getAll();
  }

  @Get(':id')
  @UseGuards(SessionGuard)
  public getLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.getById(id);
  }

  @Post()
  @UseGuards(SessionGuard)
  public addLocation(@Body() dto: LocationDto) {
    return this.locationService.create(dto);
  }

  @Delete(":id")
  @UseGuards(SessionGuard)
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.locationService.delete(id);
    }
}
