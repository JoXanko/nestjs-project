/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Chat } from '../chat/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  date: string;

  @Column({ default: false })
  seen: boolean;

  @Column()
  senderId: number;

  @ManyToOne(() => Chat, {
    onDelete: 'CASCADE',
  })
  chat: Chat;
}
