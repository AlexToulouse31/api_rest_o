import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, JoinColumn, BaseEntity } from "typeorm"
import { Commande } from "./Commande"
import { Restaurant } from "./Restaurant"

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column()
    password: string
    @Column()
    admin: boolean
    @Column()
    restoUsers: number
    @Column()
    commUsers: number

    @OneToMany(() => Restaurant, (restaurant) => restaurant.usersRest)
    @JoinColumn({ referencedColumnName: 'usersRest' })
    restaurant: Restaurant[]

    @OneToMany(() => Commande, (commande) => commande.usersComm)
    @JoinColumn({ name: 'usersComm' })
    commande: Commande[]
}
