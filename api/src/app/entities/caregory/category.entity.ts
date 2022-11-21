/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Class } from '../class/class.entity';
import { Level } from '../level/level.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Level, {
    onDelete: 'CASCADE',
  })
  level: Level;

  @OneToMany(() => Class, (c) => c.category)
  @JoinColumn()
  classes: Class[];
}
