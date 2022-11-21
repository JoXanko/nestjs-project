import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/app/entities/caregory/category.entity';
import { Class } from 'src/app/entities/class/class.entity';
import { Grade } from 'src/app/entities/grade/grade.entity';
import { Location } from 'src/app/entities/location/location.entity';
import { User } from 'src/app/entities/user/user.entity';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [TypeOrmModule.forFeature([Class, User, Location, Grade, Category])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
