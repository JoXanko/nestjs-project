import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
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
  @Column()
  name: string;

  @Column()
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
  classes: Class[];

  @OneToMany(() => Grade, (c) => c.grade)
  grades: Grade[];

  /*@ManyToMany(() => Playlist, (playlist) => playlist.owners)
  @JoinTable()
  playlists: Playlist[];*/ //da li treba ovako?????
  @OneToMany(() => Chat, (chat) => chat.student)
  //@JoinTable()
  chatsStudent: Chat[];

  @OneToMany(() => Chat, (chat) => chat.tutor)
  //@JoinTable()
  chatsTutor: Chat[];
}
