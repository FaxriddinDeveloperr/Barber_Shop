import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BarberShopEntity } from 'src/core/entity/barber-shop.entity';
import { BaseEntity } from 'src/common/database/baseEntity';

@Entity('services')
export class ServiceEntity extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  duration_minutes: number;

  @Column()
  barberShop_Id: string;

  //   @ManyToOne(() => BarberShopEntity, (barberShop) => barberShop.id, {
  //     onDelete: 'CASCADE',
  //   })
  //   @JoinColumn({ name: 'barberShop_Id' })
  //   barberShop: BarberShopEntity;
}
