import { BaseEntity } from "src/common/database/baseEntity";
import { BarberRole } from "src/common/enum";
import { Column, Entity } from "typeorm";

@Entity("barber")
export class BarberEntity extends BaseEntity {
    @Column({type: "varchar"})
    full_name: string

    @Column({type: "varchar"})
    phone_number: string

    @Column({type: "varchar"})
    password: string

    @Column({type:"varchar"})
    email: string

    @Column({type: "text"})
    bio: string

    @Column({type: "varchar", default: BarberRole.BARBER})
    role: BarberRole.BARBER

    @Column({type: "decimal",default: 0})
    avg_reyting: number

    @Column({type: "text"})
    img: string

    @Column({type: "varchar"})
    barberShop_id: string

    @Column({type: "boolean", default : false})
    is_avaylbl: boolean
}
