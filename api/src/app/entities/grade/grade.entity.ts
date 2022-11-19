/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @Column()
  new: boolean;

  @Column()
  grade: number;

  @Column()
  flagged: boolean;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update', 'remove'],
  })
  student: User;

  @ManyToOne(() => Class, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update', 'remove'],
  })
  class: Class;
}
