import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  UsePipes,
  ValidationPipe,
  Patch,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/app/entities/user/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/app/entities/user/user.entity';
import { CreateUserDto } from 'src/app/entities/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/entities/user/dto/update-user.dto';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/getByRole')
  findAllByRole() {
    return this.userService.findUsersByRole();
  }

  @Get('/getStudents')
  findStudents() {
    return this.userService.findAllStudents();
  }

  @Get('/getTutors')
  findTutors() {
    return this.userService.findAllTutors();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getAbout(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
