import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/app/entities/class/class.entity';
import { User } from 'src/app/entities/user/user.entity';
import { Grade } from '../../entities/grade/grade.entity';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Class, User])],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
