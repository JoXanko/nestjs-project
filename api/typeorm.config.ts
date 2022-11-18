/* eslint-disable prettier/prettier */
import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'itutor',
  entities: [],
  synchronize: true,
};

/*import { DataSource } from 'typeorm';

export const typeOrmConfig = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'mysecretpassword',
        database: 'ITutor',
        entities: [],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];*/
