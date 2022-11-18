/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Class } from '../../entities/class/class.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Class, (c) => c.location)
  classes: Class[];
}
