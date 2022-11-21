/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../entities/caregory/category.entity';
import { Class } from '../../entities/class/class.entity';

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /*@OneToMany(() => Class, (c) => c.level)
  @JoinColumn()
  classes: Class[];*/

  @OneToMany(() => Category, (Category) => Category.level, /*{
    cascade: true,
  }*/)
  @JoinColumn()
  categories: Category[];
}
