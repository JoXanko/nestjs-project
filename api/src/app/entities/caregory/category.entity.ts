/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Level } from '../level/level.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Level, (Level) => Level.categories, {
    cascade: true,
  })
  levels: Level[];
}
