import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { SessionLoginGuard } from './guards/session-login.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user/user.service';
import { CreateUserDto } from '../entities/user/dto/create-user.dto';
import { SessionGuard } from './guards/session.guard';
import { UserFromSession } from '../decorators/user.decorator';
import { User } from '../entities/user/user.entity';
import { RolesGuard } from './guards/roles.guard';
import { Role } from '../decorators/role.decorator';
import { Type } from '../entities/user/type';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(AuthService.name) private readonly authService: AuthService,
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(SessionLoginGuard)
  async login(@Body() userDto: Pick<CreateUserDto, 'username' | 'password'>) {
    const user = await this.authService.validateUser(
      userDto.username,
      userDto.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const userFromDb = await this.userService.findOneByUsername(
      userDto.username,
    );

    return await this.userService.getAbout(userFromDb.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    this.authService.logout(req, res);
  }

  @Get('session')
  @UseGuards(SessionGuard)
  async getUserSession(@UserFromSession() user: User) {
    return await this.userService.getAbout(user.id);
  }

  @Get('admin')
  @UseGuards(SessionGuard)
  @UseGuards(RolesGuard)
  @Role(Type.Admin)
  async getAdminSession(@UserFromSession() admin: User) {
    return await this.userService.getAbout(admin.id);
  }
}
