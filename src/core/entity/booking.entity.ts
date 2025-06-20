import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../api/booking/dto/update-booking.dto';
import { BaseEntity } from 'src/common/database/baseEntity';

@Entity('booking')
export class BookingEntity extends BaseEntity {
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
}
