/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  date: string;

  @ManyToOne(() => User)
  student: User;

  @ManyToOne(() => User)
  tutor: User;
}
