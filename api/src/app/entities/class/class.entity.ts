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
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../caregory/category.entity';
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

  @Column({ default: false })
  new: boolean;

  @Column()
  bio: string;

  @Column({ default: 0 })
  avgGrade: number;

  @Column({ default: '' })
  photo: string;

  @ManyToOne(() => Location, {
    onDelete: 'CASCADE',
    //cascade: ['insert', 'update', 'remove'],
  })
  location: Location;

  @ManyToOne(() => Category, {
    onDelete: 'CASCADE',
    //cascade: ['insert', 'update', 'remove'],
  })
  category: Category;

  @ManyToOne(() => User, {
    //onDelete: 'CASCADE',
    //cascade: ['insert', 'update', 'remove'],
  })
  user: User;

  @OneToMany(() => Grade, (grade) => grade.class, {
    //cascade: ['insert', 'update'],
  })
  @JoinColumn()
  grades: Grade[];
}
