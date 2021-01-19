import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import User from './User';

@Entity('appointments')
class Appointment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider_id: number;

  @ManyToOne(()=> User)
  @JoinColumn({name: 'provider_id'})
  provider: User;

  @Column('timestamp')
  date: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

}

export default Appointment;
