import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('image')
export class ImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar'})
    barber_shop_id: string;

    @Column({type: 'varchar' })
    img: string;
}
