import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LevelDto } from 'src/app/entities/level/dto/level.dto';
import { LevelService } from './level.service';
import { ApiTags } from '@nestjs/swagger';
import { SessionGuard } from 'src/app/auth/guards/session.guard';

@ApiTags('Level')
@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}
  @Get()
  @UseGuards(SessionGuard)
  public getLevels() {
    return this.levelService.getAll();
  }

  @Get(':id')
  @UseGuards(SessionGuard)
  public getLevel(@Param('id', ParseIntPipe) id: number) {
    return this.levelService.getLvlByCategoryID(id);
  }

  @Post()
  @UseGuards(SessionGuard)
  public addLevel(@Body() dto: LevelDto) {
    return this.levelService.create(dto);
  }

  /*@Delete(":id")//ZA ADMINA????
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.gradeService.delete(id);
    }*/
}
