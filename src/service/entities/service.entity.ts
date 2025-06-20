import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BarberShopEntity } from 'src/barber-shop/entities/barber-shop.entity';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
