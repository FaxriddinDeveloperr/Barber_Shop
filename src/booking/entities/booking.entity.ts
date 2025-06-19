import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../dto/update-booking.dto';

@Entity('booking')
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  user_id: string;

  @Column({ type: 'varchar' })
  service_id: string;

  @Column({ type: 'varchar' })
  barber_id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'varchar', default: Status.PENDING })
  status: Status.PENDING | Status.CONCELET | Status.CONFIRMEND;

  @CreateDateColumn({ type: 'date' })
  cretedAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;
}
