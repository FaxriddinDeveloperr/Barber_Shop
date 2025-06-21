import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BarberEntity } from './barber.entity';

@Entity('barber_schedules')
export class BarberScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  working_day: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @ManyToOne(() => BarberEntity, barber => barber.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'barber_id' })
  barber: BarberEntity;

  @Column()
  barber_id: string;
}
