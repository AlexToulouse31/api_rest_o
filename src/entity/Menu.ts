import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinColumn, OneToOne, BaseEntity, ManyToOne } from "typeorm"
import { Commande } from "./Commande"
import { Users } from "./Users"

@Entity()
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn()
    menuId: number

    @Column('varchar')
    menuName: string

    @Column({ type: 'numeric' })
    price: number
    priceMenu: any

    @ManyToOne(() => Users, (users) => users.userName, { cascade: ["insert", "update"] })

    usersName: string
    @OneToMany(() => Commande, (commande) => commande.commandeId, { cascade: ["insert", "update"] })

    commandeId: number
}   
