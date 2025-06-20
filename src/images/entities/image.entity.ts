import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  barber_shop_id: string;

  @Column({ type: 'varchar', length: 500 })
  img: string;
}
