/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Class } from '../class/class.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  comment: string;

  @Column({ default: true })
  new: boolean;

  @Column()
  grade: number;

  @Column({ default: false })
  flagged: boolean;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    //cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()//??
  student: User;

  @ManyToOne(() => Class, {
    onDelete: 'CASCADE',
    //cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()//???
  class: Class;
}
