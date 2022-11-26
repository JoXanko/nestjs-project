import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/entities/user/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: UserService.name,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: UserService.name,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
