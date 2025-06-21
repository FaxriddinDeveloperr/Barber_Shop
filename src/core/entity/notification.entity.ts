import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('notifications')
export class NotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text'})
    message: string;

    @Column({type: 'boolean'})
    is_read: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
