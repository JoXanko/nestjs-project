import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './app/category/category/category.module';
import { ChatModule } from './app/chat/chat.module';
import { ClassModule } from './app/class/class/class.module';
import { GradeModule } from './app/grade/grade/grade.module';
import { LevelModule } from './app/level/level/level.module';
import { LocationModule } from './app/location/location/location.module';
import { MessageModule } from './app/message/message/message.module';
import { UserModule } from './app/user/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CategoryModule,
    ChatModule,
    ClassModule,
    GradeModule,
    LevelModule,
    LocationModule,
    UserModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
