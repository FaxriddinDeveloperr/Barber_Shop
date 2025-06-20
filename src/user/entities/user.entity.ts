import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../dto/update-user.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: "varchar" ,default: Role.USER})
  role: Role.ADMIN | Role.USER | Role.SUPPER_ADMIN;

  @CreateDateColumn({ type: 'date' })
  cretedAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date;
}
