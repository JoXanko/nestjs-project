import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from 'src/app/entities/user/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  public getUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @Post()
  public addUser(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  /*@Delete(":id")//ZA ADMINA????
    public deleteG(@Param("id", ParseIntPipe) id: number) {
      return this.userService.delete(id);
    }*/
}
