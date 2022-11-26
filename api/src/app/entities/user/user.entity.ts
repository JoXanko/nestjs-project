import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Chat } from '../chat/chat.entity';
import { Class } from '../class/class.entity';
import { Grade } from '../grade/grade.entity';
import { Type } from './type';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'passwordHash' })
  @Exclude()
  password: string;

  @Index()
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  surname: string;

  @Column({ default: '' })
  imageUrl: string;

  @Column({ default: '' })
  bio: string;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.Undefined,
  })
  role: Type;

  @OneToMany(() => Class, (c) => c.user)
  @JoinColumn()
  classes: Class[];

  @OneToMany(() => Grade, (c) => c.grade)
  @JoinColumn()
  grades: Grade[];

  /*@ManyToMany(() => Playlist, (playlist) => playlist.owners)
  @JoinTable()
  playlists: Playlist[];*/ //da li treba ovako?????
  @OneToMany(() => Chat, (chat) => chat.student)
  //@JoinTable()
  @JoinColumn()
  chatsStudent: Chat[];

  @OneToMany(() => Chat, (chat) => chat.tutor)
  //@JoinTable()
  @JoinColumn()
  chatsTutor: Chat[];
}
