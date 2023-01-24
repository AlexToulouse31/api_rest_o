import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Commande } from "./Commande"
import { Users } from "./Users"


@Entity()

export class Restaurant {

    @PrimaryGeneratedColumn()
    id: number

    @Column()

    restoVille: string
    @Column()
    commandeRest: number
    @Column()
    usersRest: number
    @ManyToOne(() => Users, (users) => users.restoUsers)
    @JoinColumn({ name: 'restoUsers' })
    users: Users[]

    @OneToMany(() => Commande, (commande) => commande.restoComm)
    @JoinColumn({ name: 'restoComm' })
    commande: Commande[]
}