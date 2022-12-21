/* eslint-disable prettier/prettier */
import { Category } from 'src/app/entities/caregory/category.entity';
import { Chat } from 'src/app/entities/chat/chat.entity';
import { Class } from 'src/app/entities/class/class.entity';
import { Grade } from 'src/app/entities/grade/grade.entity';
import { Level } from 'src/app/entities/level/level.entity';
import { Location } from 'src/app/entities/location/location.entity';
import { Message } from 'src/app/entities/message/message.entity';
import { User } from 'src/app/entities/user/user.entity';
import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'itutor',
  entities: [Category,Chat,Class,Grade,Level,Location,User,Message],
  synchronize: true,
};
