/*import { Genre } from '../genre/genre.entity';
import { Track } from './../track/track.entity';
import { Artist } from './../artist/artist.entity';
import { ReleaseType } from './release-type';*/
import {
  Column,
  Entity,
  OneToMany,
  Index,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grade } from '../grade/grade.entity';
import { Level } from '../level/level.entity';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  //@Index()
  @Column()
  name: string;

  @Column()
  new: boolean;

  @Column()
  bio: string;

  @Column({ default: '' })
  photo: string;

  @ManyToOne(() => Location, {
    onDelete: 'CASCADE',
    //cascade: ['insert', 'update', 'remove'],
  })
  location: Location;

  @ManyToOne(() => Level, {
    onDelete: 'CASCADE',
    //cascade: ['insert', 'update', 'remove'],
  })
  level: Level;

  @ManyToOne(() => User, {
    //onDelete: 'CASCADE',
    //cascade: ['insert', 'update', 'remove'],
  })
  user: User;

  @OneToMany(() => Grade, (grade) => grade.class, {
    //cascade: ['insert', 'update'],
  })
  grades: Grade[];
}
