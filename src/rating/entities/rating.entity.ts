import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity( "rating" )
export class RatingEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar'})
    barber_id: string;

    @Column({type: 'varchar'})
    userId: string;

    @Column({type: 'varchar'})
    comment: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
