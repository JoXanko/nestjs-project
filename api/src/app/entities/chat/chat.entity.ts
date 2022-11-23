/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  student: User;

  @Column({ default: false })
  seen: boolean;
  
  @ManyToOne(() => User)
  tutor: User;

  @OneToMany(() => Message, (c) => c.chat)
  @JoinColumn()
  messages: Message[];
}
