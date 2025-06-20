import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from 'src/common/enum';
import { BaseEntity } from 'src/common/database/baseEntity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', default: UserRole.USER })
  role: UserRole.ADMIN | UserRole.USER | UserRole.SUPPER_ADMIN;
}
