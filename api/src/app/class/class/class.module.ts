import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/app/entities/class/class.entity';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
