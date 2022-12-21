import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { CategoryModule } from './app/category/category/category.module';
import { ChatModule } from './app/chat/chat.module';
import { ClassModule } from './app/class/class/class.module';
import { GradeModule } from './app/grade/grade/grade.module';
import { LevelModule } from './app/level/level/level.module';
import { LocationModule } from './app/location/location/location.module';
import { MessageModule } from './app/message/message/message.module';
import { UserModule } from './app/user/user/user.module';
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { environment } from './environment/environment';
import { AuthModule } from './app/auth/auth.module';
import { RolesGuard } from './app/auth/guards/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CategoryModule,
    ChatModule,
    ClassModule,
    GradeModule,
    LevelModule,
    LocationModule,
    UserModule,
    MessageModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        url: `redis://${environment.redisHost}:${environment.redisPort}`,
        // host: `${environment.redisHost}`,
        // port: environment.redisPort,
        isGlobal: true,
      }),
    }),
    AuthModule,
  ],
  providers: [{ provide: RolesGuard.name, useClass: RolesGuard }],
})
export class AppModule {}
