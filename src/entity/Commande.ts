import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Menu } from "./Menu"
import { Restaurant } from "./Restaurant"
import { Users } from "./Users"
@Entity()
export class Commande {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    usersComm: number

    @Column()
    menuComm: number
    @Column()
    restoComm: number
    @ManyToOne(() => Restaurant, (restaurant) => restaurant.commandeRest)
    @JoinColumn({ name: 'commandeRest' })
    commande: Commande[]
    @ManyToOne(() => Users, (users) => users.commUsers)
    @JoinColumn({ name: 'commUsers' })
    users: Users[]
    @ManyToOne(() => Menu, (menu) => menu.commandeMenu)
    @JoinColumn({ name: 'commandeMenu' })
    menu: Menu[]
}
